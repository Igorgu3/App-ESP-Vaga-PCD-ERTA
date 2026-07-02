#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>

// ================= BLE =================
#define SERVICE_UUID "12345678-1234-1234-1234-123456789abc"
#define CHAR_UUID    "abcdef01-1234-1234-1234-123456789abc"

volatile bool liberarVagaFlag = false;

// ================= PINOS =================
#define TRIG_PIN     22
#define ECHO_PIN     21
#define LED_VERMELHO 19
#define LED_VERDE    23

// ================= CONSTANTES =================
const float LIMITE_CM = 50.0;
const float MIN_CM    = 2.0;

const unsigned long INTERVALO_SENSOR_ms   = 5000;
const unsigned long TEMPO_AUTENTICACAO_ms = 60000;
const unsigned long TEMPO_BUZZER_NEGATIVO = 60UL * 1000UL;

unsigned long ultimoTempoSensor = 0;

// ================= ESTADOS =================
enum Estado {
    RESET_STATE,
    S1_AGUARDA_CARRO,
    S4_VERIFICA_PLACA,
    S3_EVENTO_POSITIVO,
    S2_EVENTO_NEGATIVO,
    S5_VERIFICA_CAMERA
};

Estado estadoAtual        = RESET_STATE;
unsigned long tempoInicioEstado   = 0;
unsigned long tempoInicioOcupacao = 0;

bool p = false;
bool L = false;

// ================= BLE CALLBACK =================
class CallbackVaga : public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pChar) override {
        String valor = pChar->getValue();
        if (valor.length() > 0 && (uint8_t)valor[0] == 0x01) {
            liberarVagaFlag = true;
        }
    }
};

void iniciarBLE() {
    BLEDevice::init("VAGA-TA");
    BLEServer  *pServer  = BLEDevice::createServer();
    BLEService *pService = pServer->createService(SERVICE_UUID);

    BLECharacteristic *pChar = pService->createCharacteristic(
        CHAR_UUID,
        BLECharacteristic::PROPERTY_WRITE
    );
    pChar->setCallbacks(new CallbackVaga());

    pService->start();
    BLEDevice::getAdvertising()->start();
    Serial.println("BLE aguardando conexao...");
}

// ================= FUNÇÕES AUXILIARES =================
void mudarEstado(Estado novoEstado) {
    estadoAtual = novoEstado;
    tempoInicioEstado = millis();
    Serial.print("Mudando para estado: ");
    Serial.println(novoEstado);
}

float medirDistancia() {
    digitalWrite(TRIG_PIN, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIG_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN, LOW);

    long tempoEcho = pulseIn(ECHO_PIN, HIGH, 25000);

    if (tempoEcho == 0) {
        Serial.println("Sem leitura ou fora do alcance");
        return -1;
    }

    float distanciaCm = tempoEcho / 58.0;
    Serial.print("Distancia: ");
    Serial.print(distanciaCm);
    Serial.println(" cm");
    return distanciaCm;
}

bool sensorVagaOcupada() {
    float d = medirDistancia();
    if (d < 0) return false;
    return (d >= MIN_CM && d <= LIMITE_CM);
}

void atualizarSensorPorMillis() {
    unsigned long agora = millis();
    if (agora - ultimoTempoSensor >= INTERVALO_SENSOR_ms) {
        ultimoTempoSensor = agora;
        p = sensorVagaOcupada();
        Serial.print("p = ");
        Serial.println(p);
    }
}

// ================= SETUP =================
void setup() {
    Serial.begin(115200);

    pinMode(TRIG_PIN,     OUTPUT);
    pinMode(ECHO_PIN,     INPUT);
    pinMode(LED_VERMELHO, OUTPUT);
    pinMode(LED_VERDE,    OUTPUT);

    digitalWrite(TRIG_PIN,     LOW);
    digitalWrite(LED_VERMELHO, LOW);
    digitalWrite(LED_VERDE,    LOW);

    iniciarBLE();
    mudarEstado(RESET_STATE);

    Serial.println("Sistema iniciado");
}

// ================= LOOP =================
void loop() {
    atualizarSensorPorMillis();

    unsigned long agora = millis();

    switch (estadoAtual) {

        case RESET_STATE:
            digitalWrite(LED_VERMELHO, LOW);
            digitalWrite(LED_VERDE,    LOW);
            if (p == false) {
                mudarEstado(S1_AGUARDA_CARRO);
            }
            break;

        case S1_AGUARDA_CARRO:
            digitalWrite(LED_VERMELHO, LOW);
            digitalWrite(LED_VERDE,    LOW);
            if (p == false) {
                delay(1);
                break;
            } else {
                mudarEstado(S4_VERIFICA_PLACA);
            }
            break;

        case S4_VERIFICA_PLACA:
            digitalWrite(LED_VERMELHO, HIGH);
            digitalWrite(LED_VERDE,    LOW);
            Serial.println("Aguardando autenticacao BLE...");

            // Recebeu comando 0x01 via BLE do app
            if (liberarVagaFlag) {
                liberarVagaFlag = false;
                L = true;
            }

            if (p == false && L == false && (agora - tempoInicioEstado) >= (TEMPO_AUTENTICACAO_ms / 5)) {
                mudarEstado(S1_AGUARDA_CARRO);
            } else if (p == true && L == false && (agora - tempoInicioEstado) > TEMPO_AUTENTICACAO_ms) {
                mudarEstado(S5_VERIFICA_CAMERA);
            } else if (L == true) {
                L = false;
                mudarEstado(S3_EVENTO_POSITIVO);
            }
            break;

        case S5_VERIFICA_CAMERA:
            // Câmera removida — objeto não identificado vira evento negativo
            mudarEstado(S2_EVENTO_NEGATIVO);
            break;

        case S3_EVENTO_POSITIVO:
            digitalWrite(LED_VERMELHO, LOW);
            digitalWrite(LED_VERDE,    HIGH);
            Serial.println("Vaga liberada via app!");
            delay(1);
            if (p == false) {
                mudarEstado(S1_AGUARDA_CARRO);
            }
            break;

        case S2_EVENTO_NEGATIVO:
            digitalWrite(LED_VERMELHO, HIGH);
            digitalWrite(LED_VERDE,    LOW);
            Serial.println("Notificacao: objeto bloqueando a vaga");
            if (agora - tempoInicioEstado >= TEMPO_BUZZER_NEGATIVO) {
                delay(1);
            }
            if (p == false) {
                mudarEstado(S1_AGUARDA_CARRO);
            }
            break;
    }
}
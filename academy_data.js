// THRULABS Academy Centralized Data Store

const academyData = {
    featuredCourses: [
        {
            id: "arduino-fundamentals",
            title: "Arduino Fundamentals",
            difficulty: "Beginner",
            duration: "8 Hours",
            lessons: 12,
            desc: "Learn Arduino programming, digital/analog interfaces, hardware debouncing, sensors, actuators, and build a Smart Parking system.",
            icon: "cpu",
            color: "purple-500",
            price: "FREE",
            hasCertificate: true
        },
        {
            id: "embedded-systems",
            title: "Embedded Systems Essentials",
            difficulty: "Intermediate",
            duration: "18 Hours",
            lessons: 16,
            desc: "Master bare-metal C programming, register configurations, interrupt handling, timers, and communication buses.",
            icon: "cpu",
            color: "accent",
            price: "PREMIUM",
            hasCertificate: true
        },
        {
            id: "esp32-iot",
            title: "ESP32 & IoT Development",
            difficulty: "Intermediate",
            duration: "16 Hours",
            lessons: 14,
            desc: "Deploy connected IoT applications using ESP32, dual-core tasks, Wi-Fi, HTTP/MQTT communication, and OTA firmware updates.",
            icon: "wifi",
            color: "emerald-500",
            price: "PREMIUM",
            hasCertificate: true
        },
        {
            id: "digital-electronics",
            title: "Digital Electronics Fundamentals",
            difficulty: "Beginner",
            duration: "8 Hours",
            lessons: 15,
            desc: "Analyze binary math, logic gates, truth table verification, combinational adders, shift registers, and finite state machines.",
            icon: "binary",
            color: "cyan-500",
            price: "FREE",
            hasCertificate: true
        },
        {
            id: "pcb-design",
            title: "PCB Design with KiCad",
            difficulty: "Intermediate",
            duration: "12 Hours",
            lessons: 15,
            desc: "Design electronic circuit schematics, custom library footprints, multi-layer board layouts, routing, and Gerber manufacturing files.",
            icon: "layers",
            color: "amber-500",
            price: "PREMIUM",
            hasCertificate: true
        },
        {
            id: "uav-drone",
            title: "UAV & Drone Technology",
            difficulty: "Advanced",
            duration: "20 Hours",
            lessons: 18,
            desc: "Learn flight mechanics, ESC speed controllers, brushless outrunner motors, sensor fusion filters, and GPS waypoint mission planning.",
            icon: "plane",
            color: "rose-500",
            price: "PREMIUM",
            hasCertificate: true
        },
        {
            id: "communication-systems-basics",
            title: "Communication Systems Basics",
            difficulty: "Beginner",
            duration: "6 Hours",
            lessons: 12,
            desc: "Introduction to signal modulation, noise reduction, analog modulation (AM/FM), and digital transmission standards.",
            icon: "radio",
            color: "cyan-500",
            price: "FREE",
            hasCertificate: true
        },
        {
            id: "introduction-to-embedded",
            title: "Introduction to Embedded Systems",
            difficulty: "Beginner",
            duration: "5 Hours",
            lessons: 10,
            desc: "Basics of microcontrollers, breadboard prototyping, hardware component identification, and compiling first firmware loops.",
            icon: "cpu",
            color: "purple-500",
            price: "FREE",
            hasCertificate: true
        },
        {
            id: "basic-electronics",
            title: "Basic Electronics",
            difficulty: "Beginner",
            duration: "8 Hours",
            lessons: 12,
            desc: "Understand voltage, current, resistance, Ohm's law, passive component behaviors, and transistor switching circuits.",
            icon: "activity",
            color: "emerald-500",
            price: "FREE",
            hasCertificate: true
        },
        {
            id: "rtos",
            title: "RTOS Development",
            difficulty: "Advanced",
            duration: "14 Hours",
            lessons: 18,
            desc: "Master real-time preemptive schedulers, task priority weights, semaphores, mutexes, and thread-safe queues in FreeRTOS.",
            icon: "sliders",
            color: "accent",
            price: "PREMIUM",
            hasCertificate: true
        },
        {
            id: "aiot",
            title: "AIoT Engineering",
            difficulty: "Advanced",
            duration: "16 Hours",
            lessons: 15,
            desc: "Deploy neural networks and deep learning models at the edge using ESP32 cameras, tinyML, and cloud dashboards.",
            icon: "network",
            color: "rose-500",
            price: "PREMIUM",
            hasCertificate: true
        },
        {
            id: "advanced-embedded",
            title: "Advanced Embedded Systems",
            difficulty: "Advanced",
            duration: "18 Hours",
            lessons: 20,
            desc: "Dive deep into ARM processor registers, hardware driver programming, low-power modes, and memory protection units (MPU).",
            icon: "cpu",
            color: "amber-500",
            price: "PREMIUM",
            hasCertificate: true
        },
        {
            id: "industry-projects",
            title: "Industry Project Programs",
            difficulty: "Expert",
            duration: "20 Hours",
            lessons: 15,
            desc: "Construct enterprise-grade engineering prototypes matching industry design specifications, parts sourcing, and compliance.",
            icon: "briefcase",
            color: "purple-500",
            price: "PREMIUM",
            hasCertificate: true
        }
    ],
    certifications: {
        "arduino": {
            id: "arduino",
            title: "Arduino Fundamentals Certification",
            duration: "24 Hours",
            level: "Beginner",
            modules: 6,
            icon: "award",
            color: "emerald-500",
            overview: "Verify your competency in embedded development, sensors interfacing, basic circuit calculations, and the C/C++ Arduino framework.",
            eligibility: "Open to all students. Recommended completion of the Arduino Fundamentals course.",
            skills: ["C/C++ Arduino Dialect", "GPIO & Register Config", "Analog/Digital Sensors", "Actuators & DC Motors", "PWM & ADC Conversion", "UART Serial Data Protocol"],
            assessment: "3-Question Mock Assessment (100% correct answers required) + Verification database logs.",
            certIdPrefix: "TL-2026-ARD",
            questions: [
                { q: "What is the standard voltage rating of an Arduino Uno digital pin when set to HIGH?", options: ["3.3V", "5.0V", "12V"], ans: 1 },
                { q: "Which function is executed repeatedly in an Arduino sketch?", options: ["setup()", "main()", "loop()"], ans: 2 },
                { q: "Which function allows configuring a pin as an input or output?", options: ["digitalWrite()", "pinMode()", "analogRead()"], ans: 1 }
            ]
        },
        "embedded": {
            id: "embedded",
            title: "Embedded Systems Certification",
            duration: "40 Hours",
            level: "Intermediate",
            modules: 10,
            icon: "cpu",
            color: "accent",
            overview: "Demonstrate register-level firmware development skills, bare-metal C configurations, interrupts, timers, and DMA channels on STM32 microcontrollers.",
            eligibility: "Completion of Embedded Systems Essentials course is recommended.",
            skills: ["Bare-metal C Programming", "Register Masking", "SPI/I2C/UART Protocols", "Hardware Interrupts (NVIC)", "DMA & Timer Registers", "FreeRTOS Integration"],
            assessment: "3-Question Register-level config check (100% score required).",
            certIdPrefix: "TL-2026-EMB",
            questions: [
                { q: "In an STM32 MCU, what register controls the input/output mode of GPIO Port A?", options: ["GPIOA_ODR", "GPIOA_MODER", "GPIOA_IDR"], ans: 1 },
                { q: "Which communication protocol uses SCL and SDA lines?", options: ["SPI", "I2C", "UART"], ans: 1 },
                { q: "What is an ISR?", options: ["Internal System Register", "Interrupt Service Routine", "Instruction Set Receiver"], ans: 1 }
            ]
        },
        "iot": {
            id: "iot",
            title: "IoT Development Certification",
            duration: "35 Hours",
            level: "Intermediate",
            modules: 8,
            icon: "wifi",
            color: "purple-500",
            overview: "Validate your expertise in sensor network architectures, ESP32 dual-core setups, MQTT protocols, HTTP JSON APIs, and cloud integration.",
            eligibility: "Prior knowledge of basic network protocols and C/C++ is recommended.",
            skills: ["ESP32 Dual-core Architecture", "MQTT Broker Telemetry", "HTTP GET/POST API Integration", "Wi-Fi Clients & Security", "Low-power Sleep Modes", "OTA Firmware Updates"],
            assessment: "3-Question IoT Telemetry quiz (100% correct answers required).",
            certIdPrefix: "TL-2026-IOT",
            questions: [
                { q: "Which protocol is lightweight, uses a publish/subscribe model, and is ideal for low-bandwidth IoT networks?", options: ["HTTP", "MQTT", "FTP"], ans: 1 },
                { q: "What is the purpose of ESP32 Deep Sleep mode?", options: ["To overclock the dual cores", "To minimize current consumption by shutting down core components", "To run background compilation"], ans: 1 },
                { q: "What port is typically used for unencrypted MQTT communication?", options: ["1883", "8080", "443"], ans: 0 }
            ]
        },
        "pcb": {
            id: "pcb",
            title: "PCB Design Certification",
            duration: "30 Hours",
            level: "Advanced",
            modules: 7,
            icon: "layers",
            color: "amber-500",
            overview: "Certify your structural PCB layout design, footprint matching, design rules checking, power stitching, and Gerber export workflow using KiCad.",
            eligibility: "Requires baseline familiarity with circuit schematics.",
            skills: ["Schematic Capture & Symbols", "Multi-layer Placements", "Trace Width Current Rules", "DRC Error Verification", "Copper Pour Fill & Stitching", "Gerber File Generation"],
            assessment: "3-Question manufacturing design check (100% score required).",
            certIdPrefix: "TL-2026-PCB",
            questions: [
                { q: "What does DRC stand for in PCB Design?", options: ["Direct Routing Channel", "Design Rule Check", "Digital Resistor Component"], ans: 1 },
                { q: "Which file format is standard for exporting PCB layouts for manufacturing?", options: ["Gerber", "STEP", "PDF"], ans: 0 },
                { q: "In KiCad, what is the default unit for trace width and clearance rules?", options: ["Pixels", "Mils or Millimeters", "Characters"], ans: 1 }
            ]
        },
        "drone": {
            id: "drone",
            title: "Drone Technology Certification",
            duration: "45 Hours",
            level: "Intermediate",
            modules: 9,
            icon: "plane",
            color: "cyan-500",
            overview: "Demonstrate professional knowledge of aerodynamics, drone assembly sequences, ESC control signals, telemetry bindings, and PID stabilization loops.",
            eligibility: "Highly recommended to review aerodynamics and flight mechanics.",
            skills: ["Aerodynamics & Lift Calculations", "Brushless ESC Quadrants", "Gyro IMU Sensor Fusion", "PID Attitude Tuning", "RF Telemetry Bindings", "Autonomous Mission Planning"],
            assessment: "3-Question avionics quiz (100% correct answers required).",
            certIdPrefix: "TL-2026-DRN",
            questions: [
                { q: "What component regulates the speed of a brushless DC motor based on signals from the flight controller?", options: ["IMU", "ESC (Electronic Speed Controller)", "Telemetry module"], ans: 1 },
                { q: "Which flight controller firmware is widely used for professional and commercial drone mission planning?", options: ["PX4 / ArduPilot", "Arduino IDE", "FreeRTOS"], ans: 0 },
                { q: "What happens if the P gain in a flight controller's PID loop is set too high?", options: ["The drone loses all motor power", "The drone exhibits high-frequency oscillations", "The drone flies in reverse"], ans: 1 }
            ]
        },
        "digital": {
            id: "digital",
            title: "Digital Electronics Certification",
            duration: "28 Hours",
            level: "Beginner",
            modules: 6,
            icon: "binary",
            color: "rose-500",
            overview: "Validate basic engineering foundations: boolean algebra, gate logic, Karnaugh-maps, synchronous flip-flop registers, and finite state machines.",
            eligibility: "Introductory level, no prerequisites.",
            skills: ["Logic Gates Truth Tables", "Karnaugh Map Reduction", "Flip-Flop State Registers", "Combinational Adders/Mux", "Sequential Counters", "FSM Synthesis"],
            assessment: "3-Question Boolean gate assessment (100% score required).",
            certIdPrefix: "TL-2026-DIG",
            questions: [
                { q: "What is the simplified Boolean expression for A + A'B?", options: ["A + B", "AB", "A"], ans: 0 },
                { q: "Which gate is known as the Universal Gate because it can be used to implement any other logic gate?", options: ["AND", "NAND", "XOR"], ans: 1 },
                { q: "What sequential circuit element is triggered by a clock edge to store 1 bit of data?", options: ["Multiplexer", "Flip-Flop", "Logic Gate"], ans: 1 }
            ]
        }
    },
    projectTracks: {
        "rover": {
            id: "rover",
            title: "Arduino-Based Autonomous Rover",
            desc: "Construct a self-navigating, high-precision rover utilizing PID telemetry feedback loops and obstacle avoidance routines.",
            difficulty: "Advanced",
            time: "20 Hours",
            icon: "bot",
            color: "rose-500",
            components: [
                { name: "ESP32-S3 Board", qty: 1, desc: "Main processing microcontroller board" },
                { name: "Hall-Effect Encoder Motors", qty: 2, desc: "Provides high-resolution velocity feedback" },
                { name: "MPU6050 6-Axis IMU", qty: 1, desc: "Sensing gyroscope + accelerometer unit" },
                { name: "TB6612FNG Driver Shield", qty: 1, desc: "Dual MOSFET H-Bridge motor controller" },
                { name: "11.1V 3S LiPo Battery", qty: 1, desc: "High discharge system power source" }
            ],
            outcomes: [
                "Establish interrupt-driven quadrature speed calculations",
                "Program a double-precision PID loop controls engine",
                "Integrate sensor fusion algorithms matching IMU angles"
            ],
            applications: [
                "Warehouse automated guided vehicles (AGVs)",
                "Planetary exploration rover prototypes",
                "Search and rescue robot platforms"
            ],
            steps: [
                "Assemble the chassis frame and mount the encoder motors and wheels.",
                "Wire the TB6612FNG controller driver to the ESP32 GPIO channels.",
                "Affix the MPU6050 IMU flat at the geometric center of the platform.",
                "Upload the PID feedback firmware and calibrate gains using Serial logs."
            ],
            schematic: "1. Driver: VMOT -> 11.1V battery, VCC -> 5V rail. Input control lines -> ESP32 GPIO 14, 27, 25, 26. PWM -> GPIO 12/13.\n2. Sensors: MPU6050 on I2C pins GPIO 21/22. Motor encoders pulse lines -> GPIO 19/18.",
            code: `const int encoderPinA = 19;
volatile long pulseCount = 0;
double kp = 2.5, ki = 1.2, kd = 0.1, targetRPS = 4.0;
double error = 0, lastError = 0, integral = 0;
unsigned long lastTime = 0;
void IRAM_ATTR countPulse() { pulseCount++; }
void setup() {
  pinMode(encoderPinA, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(encoderPinA), countPulse, RISING);
  lastTime = millis();
}
void loop() {
  unsigned long now = millis();
  double dt = (now - lastTime) / 1000.0;
  if (dt >= 0.1) {
    noInterrupts(); long current = pulseCount; pulseCount = 0; interrupts();
    double currentRPS = (double)current / (11.0 * 30.0) / dt;
    error = targetRPS - currentRPS;
    integral += error * dt;
    double output = (kp * error) + (ki * integral) + (kd * (error - lastError)/dt);
    output = constrain(output, 0, 255);
    analogWrite(12, (int)output);
    lastError = error; lastTime = now;
  }
}`,
            downloads: [
                { label: "Download Schematics (PDF)", url: "#" },
                { label: "Download Firmware Source Code (INO)", url: "#" },
                { label: "Download BOM Parts List (CSV)", url: "#" }
            ]
        },
        "line-follower": {
            id: "line-follower",
            title: "Line Following Robot Using IR Sensors",
            desc: "Build an autonomous robot that follows a dark path on a light surface using infrared reflectance sensors.",
            difficulty: "Beginner",
            time: "8 Hours",
            icon: "bot",
            color: "amber-500",
            components: [
                { name: "Arduino Uno R3", qty: 1, desc: "ATmega328P Microcontroller Board" },
                { name: "IR Sensor TCRT5000 Array", qty: 1, desc: "3-Channel Reflectance Sensor module" },
                { name: "L298N Motor Driver", qty: 1, desc: "Dual H-bridge Motor Controller" },
                { name: "Geared DC Motors", qty: 2, desc: "1:48 Ratio 3-6V DC Motors" },
                { name: "18650 Li-ion Cells", qty: 2, desc: "3.7V batteries in series (7.4V)" }
            ],
            outcomes: [
                "Program conditional logic reading multiple digital inputs simultaneously",
                "Establish dual H-bridge motor controls using PWM for speed adjustments",
                "Tune sensor thresholds to maintain straight alignment on sharp tracks"
            ],
            applications: [
                "Automated mail delivery systems in offices",
                "Industrial material handling on predefined tracks",
                "Educational robotics platforms"
            ],
            steps: [
                "Mount DC motors and caster wheel onto the acrylic plate platform.",
                "Fit TCRT5000 sensor array at front-bottom, approx. 5mm above the floor.",
                "Wire motors to L298N driver and driver inputs to Arduino. Add battery cells.",
                "Upload code and adjust motor speeds for optimal trajectory tracking."
            ],
            schematic: "1. IR Sensor TCRT5000: VCC -> Arduino 5V, GND -> Arduino GND, Left/Center/Right Out -> D2, D3, D4.\n2. L298N Motor Driver: IN1-4 -> Arduino D5, D6, D9, D10. 12V Screw Terminal -> Battery positive (7.4V), GND -> Battery negative & Arduino GND. OUT1-4 -> DC Motors.",
            code: `const int leftSensor = 2, centerSensor = 3, rightSensor = 4;
const int motorA1 = 5, motorA2 = 6, motorB1 = 9, motorB2 = 10;
void setup() {
  pinMode(leftSensor, INPUT); pinMode(centerSensor, INPUT); pinMode(rightSensor, INPUT);
  pinMode(motorA1, OUTPUT); pinMode(motorA2, OUTPUT); pinMode(motorB1, OUTPUT); pinMode(motorB2, OUTPUT);
}
void loop() {
  int L = digitalRead(leftSensor), C = digitalRead(centerSensor), R = digitalRead(rightSensor);
  if (C == 1 && L == 0 && R == 0) moveForward();
  else if (L == 1) turnLeft();
  else if (R == 1) turnRight();
  else stopMotors();
}
void moveForward() { analogWrite(motorA1, 140); digitalWrite(motorA2, LOW); analogWrite(motorB1, 140); digitalWrite(motorB2, LOW); }
void turnLeft() { analogWrite(motorA1, 40); digitalWrite(motorA2, LOW); analogWrite(motorB1, 160); digitalWrite(motorB2, LOW); }
void turnRight() { analogWrite(motorA1, 160); digitalWrite(motorA2, LOW); analogWrite(motorB1, 40); digitalWrite(motorB2, LOW); }
void stopMotors() { digitalWrite(motorA1, LOW); digitalWrite(motorA2, LOW); digitalWrite(motorB1, LOW); digitalWrite(motorB2, LOW); }`,
            downloads: [
                { label: "Download Mechanical Assembly Guide (PDF)", url: "#" },
                { label: "Download Line Follower Sketch (INO)", url: "#" }
            ]
        },
        "agriculture": {
            id: "agriculture",
            title: "Smart Agriculture Monitoring System",
            desc: "Deploy a low-power sensing node that collects environmental moisture data and operates a relay-controlled watering pump.",
            difficulty: "Intermediate",
            time: "10 Hours",
            icon: "sprout",
            color: "emerald-500",
            components: [
                { name: "ESP32 NodeMCU SoC", qty: 1, desc: "Wi-Fi enabled dual core CPU" },
                { name: "Capacitive Soil Sensor", qty: 1, desc: "Corrosion-resistant analog probe" },
                { name: "5V Optocoupler Relay", qty: 1, desc: "Isolates water pump high current" },
                { name: "Submersible 5V Pump", qty: 1, desc: "Water actuator" }
            ],
            outcomes: [
                "Implement low-power Wi-Fi client protocols linking nodes to brokers",
                "Construct analog read loops converting ADC registers to percentages",
                "Script auto-watering triggers based on moisture readings"
            ],
            applications: [
                "Automated greenhouse irrigation systems",
                "Soil moisture logging for smart farming",
                "Home garden smart watering systems"
            ],
            steps: [
                "Assemble probe and relay switches on solderless breadboard.",
                "Route pump positive cable loop through relay COM and NO ports.",
                "Code Wi-Fi and MQTT publication threads inside Arduino IDE."
            ],
            schematic: "Moisture Sensor Out -> ESP32 GPIO 34. Relay Trigger -> ESP32 GPIO 18. DHT22 Data -> ESP32 GPIO 4.",
            code: `#include <WiFi.h>
#include <PubSubClient.h>
#define PUMP_PIN 18
#define SENSOR_PIN 34
const char* ssid = "Thrulabs_Network";
WiFiClient esp; PubSubClient mqtt(esp);
void setup() {
  pinMode(PUMP_PIN, OUTPUT);
  WiFi.begin(ssid, "secure_pass");
}
void loop() {
  int val = analogRead(SENSOR_PIN);
  int pct = map(val, 3200, 1100, 0, 100);
  if(pct < 30) digitalWrite(PUMP_PIN, HIGH);
  else digitalWrite(PUMP_PIN, LOW);
  delay(5000);
}`,
            downloads: [
                { label: "Download Schematics (PDF)", url: "#" },
                { label: "Download Soil Telemetry Code (INO)", url: "#" }
            ]
        },
        "obstacle-robot": {
            id: "obstacle-robot",
            title: "Obstacle Avoidance Robot",
            desc: "Design and program a mobile rover that scans its surroundings via ultrasonic telemetry and steers dynamically to avoid collisions.",
            difficulty: "Beginner",
            time: "6 Hours",
            icon: "cpu",
            color: "accent",
            components: [
                { name: "Arduino Uno", qty: 1, desc: "Microcontroller board" },
                { name: "HC-SR04 Sonar", qty: 1, desc: "Ultrasonic transceiver" },
                { name: "SG90 Micro Servo", qty: 1, desc: "Range scanner" },
                { name: "L298N Driver", qty: 1, desc: "H-Bridge Motor Driver" }
            ],
            outcomes: [
                "Calculate distance telemetry using sound-wave propagation timings",
                "Interface servo rotation sweeps to map collision clearance",
                "Integrate differential steering actions based on sonar feedback"
            ],
            applications: [
                "Vacuum cleaning autonomous robots",
                "Crash prevention systems for automated vehicles",
                "Sensing and mapping unknown environments"
            ],
            steps: [
                "Mount range servo pointing forward at front center of the chassis.",
                "Solder sensor signals and motor driver ports to digital pins.",
                "Calibrate threshold distances to avoid walls."
            ],
            schematic: "HC-SR04: Trig->Pin 11, Echo->Pin 12. Servo: Signal->Pin 10. Motors: IN1-4 -> Pins 5,6,7,8.",
            code: `#include <Servo.h>
const int trig = 11, echo = 12; Servo s;
void setup() {
  pinMode(trig, OUTPUT); pinMode(echo, INPUT);
  s.attach(10); s.write(90);
}
int getD() {
  digitalWrite(trig, LOW); delayMicroseconds(2);
  digitalWrite(trig, HIGH); delayMicroseconds(10);
  digitalWrite(trig, LOW);
  return pulseIn(echo, HIGH) * 0.034 / 2;
}`,
            downloads: [
                { label: "Download Chassis Schematic (PDF)", url: "#" },
                { label: "Download Obstacle Avoidance Code (INO)", url: "#" }
            ]
        }
    },
    careerRoadmaps: {
        "embedded": {
            id: "embedded",
            title: "Embedded Systems Engineer",
            icon: "cpu",
            color: "accent",
            desc: "Develop low-level drivers, core firmware layers, real-time operating threads, and perform register level microcontroller testing.",
            skills: ["C/C++ Programming", "Microcontroller Architectures", "RTOS Task Scheduling", "SPI/I2C/UART Protocols", "Oscilloscopes & Logic Analyzers"],
            timeline: [
                { stage: "Phase 1: Hardware Basics", desc: "Understand circuit elements, logic states, pull-up circuits, and multimeter tests.", topics: ["Ohm's Law", "Logic gates", "Signal measurement"] },
                { stage: "Phase 2: Microcontroller Fundamentals", desc: "Learn internal architectures, GPIO config, registers, timers, and interrupts.", topics: ["ATmega328P pinouts", "GPIO modes", "Interrupt routines"] },
                { stage: "Phase 3: Serial Protocols", desc: "Configure master-slave networks using hardware communication protocols.", topics: ["UART debugging", "I2C SDA/SCL lines", "SPI registers"] },
                { stage: "Phase 4: Real-Time Systems", desc: "Integrate thread scheduler layers, RTOS structures, mutex, semaphores.", topics: ["FreeRTOS task priorities", "Interrupt context switching", "Embedded Linux cores"] }
            ],
            courses: ["arduino-fundamentals", "embedded-systems"],
            projects: ["line-follower", "obstacle-robot"],
            certifications: ["arduino", "embedded"],
            opportunities: [
                "Embedded Software Engineer ($90,000 - $120,000/yr)",
                "Firmware Validation Engineer ($85,000 - $110,000/yr)",
                "Hardware Systems Engineer ($95,000 - $130,000/yr)"
            ]
        },
        "aiot": {
            id: "aiot",
            title: "AIoT Systems Engineer",
            icon: "network",
            color: "emerald-500",
            desc: "Deploy smart hardware systems using internet connectivity protocols, edge model inference nodes, and cloud telemetry databases.",
            skills: ["ESP32 & BLE SoC", "MQTT Telemetry Pipelines", "Python & Edge ML (TensorFlow Lite)", "API Gateway Integrations", "Database logging"],
            timeline: [
                { stage: "Phase 1: Connected Devices", desc: "Configure Wi-Fi connections, TCP/IP basics, and network sockets.", topics: ["Wi-Fi Client classes", "Static IPs", "Network security"] },
                { stage: "Phase 2: Publish/Subscribe Models", desc: "Establish telemetry connections sending JSON packages to brokers.", topics: ["MQTT message payloads", "HiveMQ setups", "KeepAlive timers"] },
                { stage: "Phase 3: Edge Inference", desc: "Deploy lightweight neural net calculations on microcontroller nodes.", topics: ["Model quantization", "ESP32-CAM images", "Motion anomaly detection"] },
                { stage: "Phase 4: Analytics Databases", desc: "Route broker feeds into time-series logs and dashboard UI panels.", topics: ["InfluxDB logging", "Grafana telemetry charts", "Node-RED script relays"] }
            ],
            courses: ["esp32-iot"],
            projects: ["agriculture"],
            certifications: ["iot"],
            opportunities: [
                "IoT Solutions Architect ($110,000 - $145,000/yr)",
                "Edge AI Firmware Developer ($105,000 - $135,000/yr)",
                "Smart Systems Integration Lead ($100,000 - $125,000/yr)"
            ]
        },
        "uav": {
            id: "uav",
            title: "UAV Systems Engineer",
            icon: "navigation",
            color: "amber-500",
            desc: "Develop robotics avionics, PID control loops, GPS mission routing, and telemetry links on multirotor platforms.",
            skills: ["Autopilot Flight Firmware (PX4/ArduPilot)", "PID Feedback Loops", "RF Telemetry Bindings", "Aerodynamics & Propellers", "ROS (Robot Operating System)"],
            timeline: [
                { stage: "Phase 1: Flight Mechanics", desc: "Master aerodynamic forces, brush motors power requirements, and battery discharge ratios.", topics: ["Lift & thrust calculations", "Brushless motor outrunners", "LiPo discharge curves"] },
                { stage: "Phase 2: Avionics Hardware", desc: "Secure Flight Controller units, wiring interfaces, and radio bindings.", topics: ["FC IMU gyroscopes", "ESC speed channels", "RC transmitter mappings"] },
                { stage: "Phase 3: Flight Control Algorithms", desc: "Tune PID gain constants to maintain stable roll, pitch, and yaw.", topics: ["P error oscillations", "D rate damping", "I error accumulation offset"] },
                { stage: "Phase 4: Autonomous Autopilots", desc: "Program waypoint scripts, geo-fences, and failsafe modes.", topics: ["QGroundControl plans", "GPS coordinates", "Telemetry overrides"] }
            ],
            courses: ["uav-drone"],
            projects: ["rover"],
            certifications: ["drone"],
            opportunities: [
                "UAV Systems Developer ($100,000 - $130,000/yr)",
                "Robotics Controls Engineer ($105,000 - $140,000/yr)",
                "Autonomous Drone Telemetry Architect ($110,000 - $150,000/yr)"
            ]
        },
        "ece": {
            id: "ece",
            title: "ECE Career Path",
            icon: "radio",
            color: "cyan-500",
            desc: "Master analog circuits, digital logic design, board-level PCB layout routings, and high-frequency communication protocols.",
            skills: ["Analog/Digital Circuit Design", "PCB CAD Routing (KiCad)", "DRC Validation Rules", "Boolean Minimization", "Signal Transmission Systems"],
            timeline: [
                { stage: "Phase 1: Core Circuits", desc: "Study passive components, transistor switches, op-amps, and signal filters.", topics: ["RC cut-off filters", "BJT saturation states", "Op-amp gain values"] },
                { stage: "Phase 2: Digital Systems", desc: "Analyze logic systems, gate matrices, multiplexers, and flip-flop registers.", topics: ["Combinational gates", "JK flip-flop counters", "State machine loops"] },
                { stage: "Phase 3: PCB Layout Routing", desc: "Design schematic pathways, place footprints, run DRC, and output Gerbers.", topics: ["Track width calculation", "Ground planes stitching", "Via thermal reliefs"] },
                { stage: "Phase 4: Signal Transmission", desc: "Study RF modulation protocols, noise filtering, and telemetry arrays.", topics: ["Amplitude/Frequency modulation", "Noise margins", "Antenna impedance matching"] }
            ],
            courses: ["digital-electronics", "pcb-design"],
            projects: ["line-follower", "obstacle-robot"],
            certifications: ["pcb", "digital"],
            opportunities: [
                "Hardware Board Designer ($95,000 - $125,000/yr)",
                "Digital Design Engineer ($100,000 - $130,000/yr)",
                "RF Communication Specialist ($105,000 - $135,000/yr)"
            ]
        }
    },
    resourceCollections: {
        "formulas": {
            id: "formulas",
            title: "Formula Sheets",
            icon: "file-text",
            color: "accent",
            desc: "Reference manuals containing circuit theory rules, signal transform equations, and microcontroller register indexes.",
            downloads: [
                { label: "Download Electronics Formula Sheet (PDF)", url: "#" },
                { label: "Download Signal Calculations Cheat Sheet (PDF)", url: "#" }
            ],
            courses: ["arduino-fundamentals", "digital-electronics"],
            projects: ["line-follower"],
            html: `
                <div class="space-y-8">
                    <div>
                        <h4 class="text-white text-base font-bold mb-4 font-display">1. Basic Electronics Calculations</h4>
                        <div class="overflow-x-auto">
                            <table class="w-full text-xs font-mono text-[#BFC5D2] border-collapse border border-white/10 text-left">
                                <thead class="bg-white/5 text-white">
                                    <tr>
                                        <th class="p-3 border border-white/10">Domain</th>
                                        <th class="p-3 border border-white/10">Equation</th>
                                        <th class="p-3 border border-white/10">Parameters</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="hover:bg-white/[0.02]">
                                        <td class="p-3 border border-white/10 font-bold text-white">Ohm's Law</td>
                                        <td class="p-3 border border-white/10 text-emerald-400">V = I &times; R</td>
                                        <td class="p-3 border border-white/10">V: Volts, I: Amps, R: Ohms</td>
                                    </tr>
                                    <tr class="hover:bg-white/[0.02]">
                                        <td class="p-3 border border-white/10 font-bold text-white">Electric Power</td>
                                        <td class="p-3 border border-white/10 text-emerald-400">P = V &times; I = I<sup>2</sup>R</td>
                                        <td class="p-3 border border-white/10">P: Watts</td>
                                    </tr>
                                    <tr class="hover:bg-white/[0.02]">
                                        <td class="p-3 border border-white/10 font-bold text-white">RC Filter Cut-off</td>
                                        <td class="p-3 border border-white/10 text-emerald-400">f<sub>c</sub> = 1 / (2&pi;RC)</td>
                                        <td class="p-3 border border-white/10">f<sub>c</sub>: Hz, R: Ohms, C: Farads</td>
                                    </tr>
                                    <tr class="hover:bg-white/[0.02]">
                                        <td class="p-3 border border-white/10 font-bold text-white">Inverting Op-Amp</td>
                                        <td class="p-3 border border-white/10 text-emerald-400">Gain = -R<sub>f</sub> / R<sub>in</sub></td>
                                        <td class="p-3 border border-white/10">R<sub>f</sub>: Feedback, R<sub>in</sub>: Input</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        <h4 class="text-white text-base font-bold mb-4 font-display">2. Communication Systems formulas</h4>
                        <div class="overflow-x-auto">
                            <table class="w-full text-xs font-mono text-[#BFC5D2] border-collapse border border-white/10 text-left">
                                <thead class="bg-white/5 text-white">
                                    <tr>
                                        <th class="p-3 border border-white/10">Domain</th>
                                        <th class="p-3 border border-white/10">Equation</th>
                                        <th class="p-3 border border-white/10">Parameters</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="hover:bg-white/[0.02]">
                                        <td class="p-3 border border-white/10 font-bold text-white">Shannon Limit</td>
                                        <td class="p-3 border border-white/10 text-emerald-400">C = B &times; log<sub>2</sub>(1 + SNR)</td>
                                        <td class="p-3 border border-white/10">C: Capacity (bps), B: Bandwidth (Hz), SNR: Ratio</td>
                                    </tr>
                                    <tr class="hover:bg-white/[0.02]">
                                        <td class="p-3 border border-white/10 font-bold text-white">ADC Step Size</td>
                                        <td class="p-3 border border-white/10 text-emerald-400">Step = V<sub>ref</sub> / 2<sup>n</sup></td>
                                        <td class="p-3 border border-white/10">V<sub>ref</sub>: Range, n: Bit resolution</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `
        },
        "viva": {
            id: "viva",
            title: "Viva Questions",
            icon: "message-circle",
            color: "emerald-500",
            desc: "Review compiled questions frequently asked during university lab examinations and hardware demonstrations.",
            downloads: [
                { label: "Download Microcontroller Viva Q&A Guide (PDF)", url: "#" },
                { label: "Download Digital Circuits Viva Preparation (PDF)", url: "#" }
            ],
            courses: ["embedded-systems", "digital-electronics"],
            projects: ["obstacle-robot"],
            html: `
                <div class="space-y-4">
                    <h4 class="text-white text-base font-bold mb-4 font-display">Common Laboratory Viva Questions</h4>
                    
                    <div class="space-y-3 font-sans text-sm">
                        <div class="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <span class="text-emerald-400 font-mono text-xs block mb-1">Embedded Systems Q1</span>
                            <h5 class="text-white font-bold text-sm mb-2">Why do we connect pull-up or pull-down resistors to digital switch inputs?</h5>
                            <p class="text-[#BFC5D2] text-xs font-light leading-relaxed">
                                When a switch is open, the input pin is physically disconnected. Ambient electromagnetic noise will cause the pin voltage to float, resulting in random toggling between HIGH and LOW readings inside <code>digitalRead()</code>. A pull-up resistor forces a solid 5V/3.3V (HIGH) path by default, whereas a pull-down forces a GND (LOW) connection, ensuring predictable digital states.
                            </p>
                        </div>

                        <div class="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <span class="text-emerald-400 font-mono text-xs block mb-1">IoT Telemetry Q2</span>
                            <h5 class="text-white font-bold text-sm mb-2">Compare SPI and I2C communication architectures.</h5>
                            <p class="text-[#BFC5D2] text-xs font-light leading-relaxed">
                                <strong>SPI (Serial Peripheral Interface):</strong> Full-duplex synchronous bus. Uses MOSI, MISO, SCK, and a dedicated SS pin for each slave. Offers high speed (10MHz+) but high pin counts.<br>
                                <strong>I2C (Inter-Integrated Circuit):</strong> Half-duplex synchronous bus. Uses only 2 lines (SDA, SCL). Devices are addressed digitally, allowing multiple slaves on the same bus, but slower speeds (typically 100kbps - 400kbps).
                            </p>
                        </div>

                        <div class="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <span class="text-emerald-400 font-mono text-xs block mb-1">Aerospace Controls Q3</span>
                            <h5 class="text-white font-bold text-sm mb-2">What is the purpose of the Derivative (D) parameter in a drone's PID stabilizer?</h5>
                            <p class="text-[#BFC5D2] text-xs font-light leading-relaxed">
                                The Derivative parameter calculates the rate of change of the drone's position error. It acts as a brake, generating damping counter-thrust when the drone moves towards its target angle quickly, which reduces overshoots and high-frequency oscillations caused by excessive Proportional (P) gains.
                            </p>
                        </div>
                    </div>
                </div>
            `
        },
        "interview": {
            id: "interview",
            title: "Interview Preparation",
            icon: "briefcase",
            color: "purple-500",
            desc: "Prepare for embedded firmware interviews with actual code puzzles, bitwise routines, and debugging case studies.",
            downloads: [
                { label: "Download Firmware Interview Blueprint (PDF)", url: "#" },
                { label: "Download Bitwise Interview Codes (ZIP)", url: "#" }
            ],
            courses: ["embedded-systems", "pcb-design"],
            projects: ["rover"],
            html: `
                <div class="space-y-6">
                    <h4 class="text-white text-base font-bold mb-4 font-display">Embedded Software Technical Interview Prep</h4>
                    
                    <div class="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4">
                        <div>
                            <span class="text-emerald-400 font-mono text-[10px] uppercase block mb-1">Topic 1: Volatile Keyword</span>
                            <h5 class="text-white font-bold text-xs">What is the purpose of the <code>volatile</code> keyword in C?</h5>
                            <p class="text-[#BFC5D2] text-xs font-light leading-relaxed mt-2">
                                It informs the compiler that a variable's value can change outside the code sequence (such as inside hardware registers or Interrupt Service Routines). This prevents the compiler's optimizer from skipping memory access loops.
                            </p>
                        </div>
                    </div>

                    <div class="p-5 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4">
                        <div>
                            <span class="text-emerald-400 font-mono text-[10px] uppercase block mb-1">Topic 2: Bitwise Macros</span>
                            <h5 class="text-white font-bold text-xs">Common Bitwise Operations:</h5>
                            <p class="text-[#BFC5D2] text-xs font-light leading-relaxed mt-2 mb-3">
                                Standard macros to modify hardware registers:
                            </p>
                            <pre class="bg-black/40 border border-white/10 p-4 rounded-xl text-emerald-400 font-mono text-[10.5px] overflow-x-auto leading-relaxed">
#define SET_BIT(REG, BIT)   ((REG) |= (1UL << (BIT)))
#define CLR_BIT(REG, BIT)   ((REG) &= ~(1UL << (BIT)))
#define TGL_BIT(REG, BIT)   ((REG) ^= (1UL << (BIT)))
#define CHK_BIT(REG, BIT)   (((REG) >> (BIT)) & 1UL)</pre>
                        </div>
                    </div>
                </div>
            `
        },
        "notes": {
            id: "notes",
            title: "Study Notes",
            icon: "notebook-pen",
            color: "amber-500",
            desc: "Compact lecture summaries, hardware architecture flowcharts, and ECE exam review materials.",
            downloads: [
                { label: "Download Nyquist & DSP Study Notes (PDF)", url: "#" },
                { label: "Download ADC Quantization Lecture Slides (PDF)", url: "#" }
            ],
            courses: ["digital-electronics", "uav-drone"],
            projects: ["line-follower"],
            html: `
                <div class="space-y-6">
                    <h4 class="text-white text-base font-bold mb-4 font-display">Engineering Lecture Summary Notes</h4>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <h5 class="text-white font-bold text-sm mb-2">Nyquist Sampling Theorem</h5>
                            <p class="text-[#BFC5D2] text-xs font-light leading-relaxed">
                                To reconstruct an analog signal without distortion (aliasing), the sampling frequency <code>Fs</code> must be at least twice the maximum frequency component <code>Fmax</code> of the input signal:
                            </p>
                            <div class="text-center font-mono text-emerald-400 my-3 text-sm">Fs &ge; 2 &times; Fmax</div>
                        </div>

                        <div class="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                            <h5 class="text-white font-bold text-sm mb-2">ADC Quantization Noise</h5>
                            <p class="text-[#BFC5D2] text-xs font-light leading-relaxed">
                                Quantization error occurs during continuous voltage rounding. The Signal-to-Quantization-Noise Ratio (SQNR) of an ideal N-bit ADC is calculated as:
                            </p>
                            <div class="text-center font-mono text-emerald-400 my-3 text-sm">SQNR = 6.02 &times; N + 1.76 dB</div>
                        </div>
                    </div>
                </div>
            `
        },
        "guides": {
            id: "guides",
            title: "Learning Guides",
            icon: "book-open",
            color: "rose-500",
            desc: "Sequence roadmaps, external reading links, and hardware board recommendations.",
            downloads: [
                { label: "Download Hardware Layout Setup Guide (PDF)", url: "#" },
                { label: "Download ECE Syllabus Study Reference (PDF)", url: "#" }
            ],
            courses: ["arduino-fundamentals", "esp32-iot"],
            projects: ["agriculture"],
            html: `
                <div class="space-y-6">
                    <h4 class="text-white text-base font-bold mb-4 font-display">ECE Learning Resources & External Guides</h4>
                    
                    <div class="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <h5 class="text-white font-bold text-sm mb-3">Recommended Learning Sequence</h5>
                        <ol class="list-decimal pl-4 space-y-2 text-xs text-[#BFC5D2] font-light">
                            <li><strong>Digital Logic Basics:</strong> Gates, K-Maps, FSM state setups.</li>
                            <li><strong>C++ Basics & Arduino:</strong> GPIO read/write loops and SPI peripherals.</li>
                            <li><strong>STM32 Architecture:</strong> Direct registers controls, RCC configuration, timer interrupts.</li>
                            <li><strong>Real-time Operating Systems:</strong> Context switching, priorities scheduler, FreeRTOS tasks.</li>
                        </ol>
                    </div>

                    <div class="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <h5 class="text-white font-bold text-sm mb-3">Open-Source Materials & Textbooks</h5>
                        <ul class="list-disc pl-4 space-y-1.5 text-xs text-[#BFC5D2] font-light">
                            <li><strong class="text-white">MIT 6.002 Courseware:</strong> Circuits and Electronics lectures and homework.</li>
                            <li><strong class="text-white">Betaflight Wiki:</strong>Autopilot loops documentation and PID tuning equations.</li>
                            <li><strong class="text-white">MIT OpenCourseWare:</strong> MIT 6.002 Circuits and Electronics video series and exam papers.</li>
                        </ul>
                    </div>
                </div>
            `
        }
    }
};

// If browser environment, export or make globally available
if (typeof module !== 'undefined' && module.exports) {
    module.exports = academyData;
} else {
    window.academyData = academyData;
}

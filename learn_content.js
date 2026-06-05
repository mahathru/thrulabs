const courses = {
    "arduino-fundamentals": {
        category: "Embedded Systems",
        title: "Arduino Fundamentals",
        desc: "Learn Arduino programming, sensors, actuators, and project development.",
        difficulty: "Beginner",
        duration: "6 Hours",
        lessons: 18,
        whatYouWillLearn: [
            "Microcontroller basics and ATMega328P pin structures",
            "Arduino IDE structure, setup, and sketch compilation",
            "GPIO digital input/output configurations",
            "Interfacing sensors via analog inputs (ADC)",
            "Pulse Width Modulation (PWM) duty cycles",
            "UART Serial communications and commands",
            "Motor and actuator interfacing (DC & Servos)",
            "Designing logic thresholds and automated prototypes"
        ],
        skillsGained: [
            "Firmware Development",
            "Analog & Digital Interfacing",
            "Electrical Prototyping",
            "C/C++ Arduino Dialect"
        ],
        careerRelevance: "Essential foundation for robotics engineering, hardware validation, IoT prototyping, and consumer electronics product design.",
        toolsRequired: "Arduino Uno board, Breadboard, jumper wires, LED diodes, 220Ω resistors, potentiometer, HC-SR04 sonar sensor, SG90 servo motor.",
        prerequisites: [
            "Basic Computer Knowledge",
            "No Prior Arduino Experience Required"
        ],
        hasCertificate: false,
        certDetail: {
            available: "No",
            assessment: "Practical Assessment Required",
            verification: "Not Supported",
            idPrefix: "TL-2026-NOCERT"
        },
        modules: [
            {
                title: "Module 1: Introduction to Arduino",
                desc: "History of microcontrollers, ATmega328P architecture, and board anatomy.",
                duration: "40 Min",
                lessons: [
                    {
                        title: "Lesson 1.1: Microcontrollers vs Computers",
                        content: `
                            <p class="mb-4">Microcontrollers are dedicated integrated circuits designed to perform a specific control task. Unlike general-purpose computers, which have separate CPU, RAM, and hard drives, a microcontroller embeds all of these components onto a single silicon chip.</p>
                            <div class="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 font-mono text-[10px]">
                                CPU Core: Execution unit (often 8-bit or 32-bit)<br>
                                Flash Memory: Stores the compiled program code<br>
                                SRAM: Volatile data storage for variables<br>
                                Peripherals: GPIO pins, ADCs, Timers, SPI/I2C buses
                            </div>
                            <p>For example, the Arduino Uno features the Microchip ATmega328P microcontroller running at 16 MHz with 32KB of flash memory.</p>
                        `
                    },
                    {
                        title: "Lesson 1.2: Exploring the ATmega328P Board Layout",
                        content: `
                            <p class="mb-4">The Arduino Uno board acts as a breakout board for the ATmega328P chip. Key components on the board include the USB port, DC power jack, voltage regulator (converting 7-12V inputs to a stable 5V output), the 16MHz crystal oscillator, and the pin header headers.</p>
                            <p class="mb-4">The pins are divided into three groups:</p>
                            <ul class="list-disc pl-4 space-y-1 mb-4">
                                <li><strong>Digital Pins (0-13):</strong> Can read or write binary states (0V or 5V).</li>
                                <li><strong>Analog Input Pins (A0-A5):</strong> Read varying analog voltage values using an internal 10-bit ADC.</li>
                                <li><strong>Power Pins:</strong> Provide 5V, 3.3V, and GND connections.</li>
                            </ul>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the standard clock speed of the Arduino Uno's ATmega328P chip?", options: ["8 MHz", "16 MHz", "48 MHz"], ans: 1 },
                        { q: "Which memory type stores the compiled program code permanently?", options: ["SRAM", "Flash Memory", "EEPROM"], ans: 1 },
                        { q: "What is the standard voltage output of the power pins on the Uno board?", options: ["5.0V / 3.3V", "12V", "1.8V"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Blink the onboard LED at PIN 13 at a custom rate of 500ms.",
                    components: ["Arduino Uno Board", "USB cable type A-to-B"],
                    procedure: [
                        "Connect the Arduino Uno board to your computer using the USB cable.",
                        "Open the IDE, write the pin configuration code in setup(), and delay controls in loop().",
                        "Click 'Upload' and monitor the small yellow LED next to PIN 13."
                    ],
                    expectedOutput: "The yellow onboard LED should toggle on and off repeatedly every 500 milliseconds."
                }
            },
            {
                title: "Module 2: Arduino IDE Setup",
                desc: "Installing drivers, configuring workspace, and uploading initial sketches.",
                duration: "30 Min",
                lessons: [
                    {
                        title: "Lesson 2.1: The Arduino IDE Workspace",
                        content: `
                            <p class="mb-4">The Arduino Integrated Development Environment (IDE) is a cross-platform application that makes writing and compiling code easy. It compiles your C++ sketch into machine code (HEX file) and uploads it directly onto the board's flash memory via USB.</p>
                            <p class="mb-4">Key workspace elements:</p>
                            <ul class="list-disc pl-4 space-y-1">
                                <li><strong>Verify button (Checkmark):</strong> Compiles code checking for syntax errors.</li>
                                <li><strong>Upload button (Right arrow):</strong> Compiles and sends the binary output to the board.</li>
                                <li><strong>Serial Monitor (Magnifying glass):</strong> Terminal utility to send/receive ASCII text data.</li>
                            </ul>
                        `
                    },
                    {
                        title: "Lesson 2.2: Setup functions & Loop structures",
                        content: `
                            <p class="mb-4">Every Arduino sketch must declare exactly two functions: <code>setup()</code> and <code>loop()</code>. Without these, the compiler will raise a linkage error.</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
void setup() {
  // Runs once at startup or reset. Configure pin modes here.
}

void loop() {
  // Runs continuously in an infinite loop. Write your core logic here.
}</pre>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which function runs only once when the Arduino is powered on?", options: ["loop()", "setup()", "main()"], ans: 1 },
                        { q: "What button in the IDE is used to check for compile errors without uploading?", options: ["Upload", "Verify", "Serial Monitor"], ans: 1 },
                        { q: "What file extension is used for Arduino sketches?", options: [".c", ".cpp", ".ino"], ans: 2 }
                    ]
                },
                project: {
                    objective: "Upload a basic sketch that prints a welcome text log to the Serial Monitor at boot.",
                    components: ["Arduino Uno Board", "USB cable"],
                    procedure: [
                        "Configure Serial.begin(9600) inside the setup() function.",
                        "Write Serial.println('Welcome to Thrulabs!') beneath the initialization.",
                        "Compile, upload, and open the Serial Monitor at 9600 baud rate."
                    ],
                    expectedOutput: "The string 'Welcome to Thrulabs!' should output exactly once inside the serial console."
                }
            },
            {
                title: "Module 3: Digital I/O",
                desc: "Controlling digital pins and reading button signals.",
                duration: "45 Min",
                lessons: [
                    {
                        title: "Lesson 3.1: Digital Output (pinMode & digitalWrite)",
                        content: `
                            <p class="mb-4">Digital output allows a pin to supply electrical power (HIGH / 5V) or pull it to ground (LOW / 0V). To use digital output, you must configure the pin mode as OUTPUT.</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
void setup() {
  pinMode(8, OUTPUT); // Configure digital Pin 8 as an output
}

void loop() {
  digitalWrite(8, HIGH); // Output 5V on Pin 8
  delay(1000);
  digitalWrite(8, LOW);  // Output 0V on Pin 8
  delay(1000);
}</pre>
                        `
                    },
                    {
                        title: "Lesson 3.2: Digital Inputs & Internal Pull-up Resistors",
                        content: `
                            <p class="mb-4">When reading button switches, pins can 'float' between logic states if not connected to a reference voltage. Pull-up resistors fix this by forcing the pin to high (5V) default.</p>
                            <p class="mb-4">Arduino pins have built-in internal pull-up resistors (approx. 20kΩ) that can be enabled programmatically:</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed">
void setup() {
  pinMode(2, INPUT_PULLUP); // Pin 2 reads HIGH when open, LOW when pressed
}</pre>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What voltage value does digitalWrite(pin, HIGH) output on an Arduino Uno?", options: ["3.3V", "5.0V", "12V"], ans: 1 },
                        { q: "Why do we use INPUT_PULLUP pin mode configuration?", options: ["To double the input voltage", "To prevent floating pin values", "To disable inputs"], ans: 1 },
                        { q: "What value does digitalRead() return if an open pin is pulled high?", options: ["LOW", "HIGH", "Undefined"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Turn on an external LED connected to Pin 8 ONLY when a button on Pin 2 is pressed.",
                    components: ["Arduino Uno", "Breadboard", "LED", "220Ω resistor", "Tactile switch button", "Wires"],
                    procedure: [
                        "Connect Pin 8 through the 220Ω resistor to the LED anode. Connect cathode to GND.",
                        "Wire tactile switch between Pin 2 and GND pin.",
                        "Write logic: digitalRead(2) == LOW ? digitalWrite(8, HIGH) : digitalWrite(8, LOW)."
                    ],
                    expectedOutput: "The LED lights up immediately while the tactile button is held down, and shuts off when released."
                }
            },
            {
                title: "Module 4: Analog Inputs",
                desc: "Working with the Analog-to-Digital Converter (ADC).",
                duration: "45 Min",
                lessons: [
                    {
                        title: "Lesson 4.1: Analog Signals vs Digital States",
                        content: `
                            <p class="mb-4">Digital signals only have two states: on (1) or off (0). Analog signals vary continuously over a range (like ambient temp or light levels).</p>
                            <p class="mb-4">To read analog voltages, the microchip routes pins A0-A5 to an internal <strong>Analog to Digital Converter (ADC)</strong>. The Uno's ADC is 10-bit, meaning it translates input voltages between 0V and 5V into integer values from <strong>0 to 1023</strong>.</p>
                        `
                    },
                    {
                        title: "Lesson 4.2: Reading Potentiometers using analogRead",
                        content: `
                            <p class="mb-4">Using <code>analogRead()</code> triggers the successive approximation register (SAR) inside the chip to capture and translate the input voltage level.</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
void loop() {
  int sensorValue = analogRead(A0); // Reads voltage on Pin A0 (0-1023)
  float voltage = sensorValue * (5.0 / 1023.0); // Convert reading back to Volts
  Serial.println(voltage);
  delay(100);
}</pre>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the resolution capacity of the Arduino Uno's internal ADC?", options: ["8-bit", "10-bit", "12-bit"], ans: 1 },
                        { q: "If the input voltage is 2.5V (exactly half of reference Vref), what is the ADC reading output?", options: ["512", "1023", "256"], ans: 0 },
                        { q: "Which function captures analog voltage values?", options: ["analogWrite()", "digitalRead()", "analogRead()"], ans: 2 }
                    ]
                },
                project: {
                    objective: "Connect a rotary potentiometer and output its variable voltage reading to the Serial Monitor.",
                    components: ["Arduino Uno", "10kΩ Potentiometer", "Breadboard", "Jumper wires"],
                    procedure: [
                        "Connect potentiometer outer pin 1 to 5V, outer pin 3 to GND.",
                        "Connect middle wiper pin to analog pin A0.",
                        "Upload analogRead(A0) logging sketch and rotate knob."
                    ],
                    expectedOutput: "Rotating the potentiometer logs numbers shifting smoothly between 0 and 1023 in the console."
                }
            },
            {
                title: "Module 5: PWM Control",
                desc: "Varying analog output power using duty cycle signals.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 5.1: Concept of Pulse Width Modulation (PWM)",
                        content: `
                            <p class="mb-4">Microcontrollers cannot output varying analog voltages directly from their digital pins. Instead, they use <strong>Pulse Width Modulation (PWM)</strong>.</p>
                            <p class="mb-4">PWM simulates intermediate voltages by toggling digital pins HIGH and LOW at high frequency. The ratio of 'ON' time to 'OFF' time is the <strong>Duty Cycle</strong>:</p>
                            <ul class="list-disc pl-4 space-y-1 mb-4">
                                <li>0% Duty Cycle: Pin is permanently LOW (0V).</li>
                                <li>50% Duty Cycle: Pin is active half the time (2.5V average).</li>
                                <li>100% Duty Cycle: Pin is permanently HIGH (5V).</li>
                            </ul>
                        `
                    },
                    {
                        title: "Lesson 5.2: Using analogWrite to Fade LEDs",
                        content: `
                            <p class="mb-4">On the Uno board, pins labeled with a tilde symbol (3, 5, 6, 9, 10, 11) support PWM hardware modules. We control duty cycle using <code>analogWrite()</code>, which accepts values between <strong>0 and 255</strong> (8-bit value).</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
void loop() {
  for(int brightness = 0; brightness <= 255; brightness++) {
    analogWrite(9, brightness); // Fade LED in
    delay(5);
  }
}</pre>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which pins on the Arduino Uno support hardware PWM outputs?", options: ["All pins", "Pins A0 to A5", "Pins marked with a tilde (~) symbol"], ans: 2 },
                        { q: "What value does analogWrite(pin, 127) represent in terms of duty cycle?", options: ["25%", "50%", "100%"], ans: 1 },
                        { q: "What is the parameter range accepted by the analogWrite function?", options: ["0 to 1023", "0 to 5", "0 to 255"], ans: 2 }
                    ]
                },
                project: {
                    objective: "Fade an external LED on Pin 9 up and down continuously.",
                    components: ["Arduino Uno", "LED", "220Ω resistor", "Jumper wires"],
                    procedure: [
                        "Connect Pin 9 through the 220Ω resistor to the LED anode, cathode to GND.",
                        "Upload nested loop sketch modifying brightness values between 0 and 255.",
                        "Observe the LED's lighting intensity change."
                    ],
                    expectedOutput: "The LED smoothly glows to maximum brightness and fades to black in a continuous cycle."
                }
            },
            {
                title: "Module 6: Serial Communication",
                desc: "Sending and receiving data over the UART interface.",
                duration: "40 Min",
                lessons: [
                    {
                        title: "Lesson 6.1: Serial Interfacing and UART basics",
                        content: `
                            <p class="mb-4">Universal Asynchronous Receiver-Transmitter (UART) is a hardware serial protocol that allows two devices to share data using only two data lines: Transmit (TX) and Receive (RX).</p>
                            <p class="mb-4">Data is packed into frames containing a start bit, 8 data bits, and a stop bit. Both TX and RX devices must agree on a transmission speed, known as the <strong>Baud Rate</strong> (typically 9600 or 115200 bits per second).</p>
                        `
                    },
                    {
                        title: "Lesson 6.2: Parsing Incoming Serial Data",
                        content: `
                            <p class="mb-4">You can read user characters from the Serial buffer using <code>Serial.available()</code> and <code>Serial.read()</code>:</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
void loop() {
  if (Serial.available() > 0) {
    char inChar = Serial.read(); // Read byte
    if (inChar == 'H') digitalWrite(13, HIGH);
    if (inChar == 'L') digitalWrite(13, LOW);
  }
}</pre>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What lines are used to establish communication using the UART protocol?", options: ["SDA / SCL", "TX / RX", "MISO / MOSI"], ans: 1 },
                        { q: "What does the term Baud Rate describe?", options: ["Data transfer speed in bits/sec", "Voltage limit", "Device address index"], ans: 0 },
                        { q: "What function checks if data has been received in the serial buffer?", options: ["Serial.read()", "Serial.begin()", "Serial.available()"], ans: 2 }
                    ]
                },
                project: {
                    objective: "Create a sketch that toggles the Pin 13 LED HIGH when '1' is typed in the serial console, and LOW when '0' is typed.",
                    components: ["Arduino Uno", "USB cable"],
                    procedure: [
                        "Configure Serial.begin(9600) and set Pin 13 mode as OUTPUT.",
                        "Write conditional rules inside loop: if Serial.read() matches '1' or '0'.",
                        "Upload sketch and type parameters in Serial monitor input bar."
                    ],
                    expectedOutput: "Sending '1' immediately switches the yellow board LED on, while sending '0' switches it off."
                }
            },
            {
                title: "Module 7: Sensors",
                desc: "Reading digital and analog environmental parameters.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 7.1: Analog Sensors vs Digital Sensors",
                        content: `
                            <p class="mb-4">Sensors are transducers that convert physical states (temp, force, light) into electrical changes.</p>
                            <ul class="list-disc pl-4 space-y-1 mb-4">
                                <li><strong>Analog Sensors:</strong> Output a varying voltage ratio (e.g. TMP36 temperature sensor, LDR light resistor).</li>
                                <li><strong>Digital Sensors:</strong> Communicate values via digital protocols or pulse outputs (e.g. DHT22 humidity sensor, HC-SR04 sonar module).</li>
                            </ul>
                        `
                    },
                    {
                        title: "Lesson 7.2: Timing HC-SR04 Ultrasonic Sonar Sensors",
                        content: `
                            <p class="mb-4">The HC-SR04 sensor measures distance by emitting an ultrasonic pulse and measuring the time it takes to bounce back. The timing pulse width is converted into distance using speed-of-sound equations.</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
digitalWrite(trigPin, HIGH);
delayMicroseconds(10);
digitalWrite(trigPin, LOW);
long duration = pulseIn(echoPin, HIGH);
float distance = duration * 0.034 / 2; // Distance in cm</pre>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What physical metric does the HC-SR04 ultrasonic sensor measure?", options: ["Ambient light level", "Temperature", "Obstacle distance"], ans: 2 },
                        { q: "Which function reads the timing duration of input high pulses?", options: ["analogRead()", "pulseIn()", "digitalRead()"], ans: 1 },
                        { q: "Why do we divide the sonar travel duration by 2?", options: ["To convert to inches", "Because the sound travels to the object and back", "Due to clock dividers"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Connect an HC-SR04 sensor and output distance measurements to the serial monitor.",
                    components: ["Arduino Uno", "HC-SR04 module", "Breadboard", "Jumper wires"],
                    procedure: [
                        "Connect sensor VCC to 5V, GND to GND.",
                        "Connect Trig pin to Uno D11, Echo pin to Uno D12.",
                        "Write pulseIn trigger script and convert return time to distance in cm."
                    ],
                    expectedOutput: "The Serial Monitor prints real-time distance readouts in centimeters, reacting instantly when hand blocks sensor."
                }
            },
            {
                title: "Module 8: Motors",
                desc: "Controlling DC motors and SG90 servo positions.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 8.1: Why we need external motor drivers",
                        content: `
                            <p class="mb-4">Microcontrollers are low-power devices. An Uno's digital pin can only supply up to 40mA of current. Electric motors require hundreds of milliamps (or Amps) to rotate, and their inductive coils produce high-voltage feedback spikes (back EMF) that can destroy the microcontroller.</p>
                            <p class="mb-4">To solve this, we use H-bridge motor drivers (like L298N) that isolate the microcontroller's logic from the motor's power circuit.</p>
                        `
                    },
                    {
                        title: "Lesson 8.2: Angular Position Control of Servo Motors",
                        content: `
                            <p class="mb-4">Servo motors contain a DC motor, gearing, feedback potentiometer, and control circuit. They read PWM pulse widths to set output shaft angles between 0° and 180°.</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
#include &lt;Servo.h&gt;
Servo myServo;
void setup() {
  myServo.attach(9); // Attach servo signal to pin 9
}
void loop() {
  myServo.write(90); // Turn servo shaft to middle position (90 degrees)
  delay(1000);
}</pre>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Why is a motor driver chip (like L298N) required to run motors?", options: ["To program the motor speed", "Because motors draw more current than digital pins can supply", "To convert DC to AC"], ans: 1 },
                        { q: "What parameter does the servo write() function accept?", options: ["Duty cycle percent", "Motor velocity in RPM", "Angular degrees from 0 to 180"], ans: 2 },
                        { q: "Which library is used to control servo motor angles on Arduino?", options: ["SPI.h", "Wire.h", "Servo.h"], ans: 2 }
                    ]
                },
                project: {
                    objective: "Program a servo motor to sweep from 0 to 180 degrees and back continuously.",
                    components: ["Arduino Uno", "SG90 servo motor", "Jumper wires"],
                    procedure: [
                        "Connect Servo red wire to 5V, brown/black wire to GND, orange signal wire to Pin 9.",
                        "Include Servo.h and write loops incrementing angles from 0 to 180, and decrementing back."
                    ],
                    expectedOutput: "The servo motor's output shaft rotates back and forth smoothly between 0 and 180 degrees."
                }
            },
            {
                title: "Module 9: Mini Project",
                desc: "Integrating sensor, logic limits, and servo motor output.",
                duration: "60 Min",
                lessons: [
                    {
                        title: "Lesson 9.1: System Integration and Logic Flowchart",
                        content: `
                            <p class="mb-4">Creating complete embedded systems requires linking sensors, microcontroller code logic, and actuators. We implement this using logical threshholds.</p>
                            <p class="mb-4">For our capstone project, we will construct an **Automated Smart Gate**. When the HC-SR04 sonar sensor detects an object closer than 15 cm, the microcontroller triggers the Servo motor to rotate to 90° (open gate). When the object is gone, it returns to 0° (close gate).</p>
                        `
                    },
                    {
                        title: "Lesson 9.2: Writing Structured Integrated Firmware",
                        content: `
                            <p class="mb-4">Review the integrated system code below:</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
#include &lt;Servo.h&gt;
const int trigPin = 11;
const int echoPin = 12;
Servo gateServo;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  gateServo.attach(9);
  gateServo.write(0); // gate closed default
}

void loop() {
  digitalWrite(trigPin, HIGH); delayMicroseconds(10); digitalWrite(trigPin, LOW);
  long dur = pulseIn(echoPin, HIGH);
  float dist = dur * 0.034 / 2;
  
  if (dist < 15) {
    gateServo.write(90); // Open
  } else {
    gateServo.write(0);  // Close
  }
  delay(200);
}</pre>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the trigger pin sequence to start sonar capture?", options: ["Hold HIGH forever", "Pulse HIGH for 10 microseconds", "Hold LOW for 1 minute"], ans: 1 },
                        { q: "Which block controls the gate status in our integrated logic?", options: ["For loops", "Switch statements", "If-else conditions"], ans: 2 },
                        { q: "Which pin controls the servo motor signal in the capstone project?", options: ["Pin 9", "Pin 11", "Pin A0"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Assemble and code the complete Automated Smart Gate safety prototype.",
                    components: ["Arduino Uno", "HC-SR04 sensor", "SG90 servo motor", "Breadboard", "Jumper wires"],
                    procedure: [
                        "Wire the HC-SR04 (Trig to D11, Echo to D12) and the Servo (signal to D9) on the breadboard.",
                        "Upload the complete integrated firmware.",
                        "Move an object close to the sonar sensor and observe the servo angle shift."
                    ],
                    expectedOutput: "The servo rotates to 90 degrees immediately when an object is within 15cm, and closes when the object is removed."
                }
            }
        ]
    },
    "embedded-systems": {
        category: "Embedded Systems",
        title: "Embedded Systems Essentials",
        desc: "Learn microcontrollers, communication protocols, interrupts, and embedded development.",
        difficulty: "Intermediate",
        duration: "12 Hours",
        lessons: 32,
        whatYouWillLearn: [
            "Embedded systems hardware architectures and designs",
            "Bare-metal C register masking operations",
            "Clock trees, PLL configurations, and SysTick configuration",
            "General-purpose hardware timers and prescalers",
            "NVIC configurations and EXTI hardware interrupts",
            "Register-level UART, SPI, and I2C serial protocols",
            "Analog-to-Digital conversions and ADC modes",
            "DMA configurations and low-latency transfer pipelines"
        ],
        skillsGained: [
            "Bare-metal Firmware C",
            "Register Configuration",
            "Device Driver Design",
            "Oscilloscope Debugging"
        ],
        careerRelevance: "Crucial skills for embedded firmware development, automotive control systems engineering, and low-level IoT systems design.",
        toolsRequired: "STM32 Nucleo board or similar 32-bit MCU development board, USB debugger, Keil uVision or STM32CubeIDE software compiler.",
        prerequisites: [
            "Prior C programming basics (pointers, loops, variables)",
            "Understanding of basic digital logic states",
            "Basic computer interface navigation skills"
        ],
        certDetail: {
            available: "Yes",
            assessment: "Practical Assessment Required",
            verification: "Supported (Database verification)",
            idPrefix: "TL-2026-00002"
        },
        modules: [
            {
                title: "Module 1: Embedded Systems Basics",
                desc: "Architecture paradigms, hardware registers, and toolchains.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 1.1: Microcontroller Core Architectures",
                        content: `
                            <p class="mb-4">Embedded hardware design requires working within tight resource constraints. 32-bit microcontrollers (like the ARM Cortex-M series) use standard Harvard bus structures with separate memory channels for program code and variables.</p>
                            <p>This allows simultaneous instruction fetching and data reading, resulting in much higher performance compared to traditional Von Neumann configurations.</p>
                        `
                    },
                    {
                        title: "Lesson 1.2: Embedded C Bitwise Operations",
                        content: `
                            <p class="mb-4">Bare-metal firmware developers interact directly with hardware by modifying bits in control registers. This is done in C using bitwise operators:</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
#define REGISTER_A  *(volatile uint32_t*)(0x40020000)

REGISTER_A |= (1 << 5);   // Set bit 5 (turn on feature)
REGISTER_A &= ~(1 << 5);  // Clear bit 5 (turn off feature)
REGISTER_A ^= (1 << 5);   // Toggle bit 5</pre>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which memory architecture allows fetching code and variables at the same time?", options: ["Von Neumann", "Harvard Architecture", "SRAM Stack"], ans: 1 },
                        { q: "What bitwise operator is used to clear (force to 0) a specific register bit?", options: ["OR (|)", "AND (&)", "XOR (^)"], ans: 1 },
                        { q: "What does the 'volatile' keyword signify in embedded C?", options: ["Variable changes outside CPU execution context", "Variable is constant", "Stored in Flash"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Write a C code routine that sets bit 3 and clears bit 7 of a mock register pointer.",
                    components: ["Keil or STM32CubeIDE simulation workspace"],
                    procedure: [
                        "Declare register address macro pointer.",
                        "Use |= operator to write bit 3 HIGH.",
                        "Use &= ~ operator to clear bit 7."
                    ],
                    expectedOutput: "The mock register state transitions correctly, verifying register-level masking logic."
                }
            },
            {
                title: "Module 2: Microcontrollers",
                desc: "Clock configurations, startup files, and register mappings.",
                duration: "45 Min",
                lessons: [
                    {
                        title: "Lesson 2.1: Clock Distribution Trees & PLL Configurations",
                        content: `
                            <p class="mb-4">Microcontrollers feature complex clock routing blocks called clock trees. A central clock source (internal RC oscillator or external high-speed crystal oscillator) supplies the core. The clock frequency is multiplied using Phase-Locked Loops (PLLs) and divided using prescalers before reaching individual peripherals.</p>
                            <p>To reduce power consumption, peripheral clocks are disabled by default and must be explicitly enabled in code.</p>
                        `
                    },
                    {
                        title: "Lesson 2.2: Memory Map and Registers Allocation",
                        content: `
                            <p class="mb-4">Microcontroller registers are mapped into a flat memory address space. The CPU reads and writes peripheral settings by accessing specific memory addresses. For example, in STM32 microcontrollers, the GPIO Port A boundary address starts at ` + "`0x40020000`" + `.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Why are peripheral clocks disabled by default in microcontrollers?", options: ["To save power", "To prevent clock skew", "For security reasons"], ans: 0 },
                        { q: "Which component is used to multiply input clock source frequencies?", options: ["Prescaler", "PLL (Phase-Locked Loop)", "Systick Timer"], ans: 1 },
                        { q: "What is a memory map?", options: ["Allocation of peripheral registers to specific address ranges", "Program flow chart", "Flash memory visual layout"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Enable the peripheral clock tree for GPIO Port A in an STM32 environment.",
                    components: ["STM32 Nucleo Board", "IDE"],
                    procedure: [
                        "Identify the Reset and Clock Control (RCC) AHB1 peripheral clock register.",
                        "Set the GPIOA clock enable bit in the RCC register in your setup routine."
                    ],
                    expectedOutput: "The GPIO Port A clock activates, allowing configuration of its pin registers."
                }
            },
            {
                title: "Module 3: GPIO",
                desc: "Register configuration for input, output, pull-up, and alternate mode structures.",
                duration: "55 Min",
                lessons: [
                    {
                        title: "Lesson 3.1: GPIO Port Modes (MODER Registers)",
                        content: `
                            <p class="mb-4">GPIO registers configure electrical pins for different jobs. For example, in 32-bit microcontrollers, the GPIO ` + "`MODER`" + ` register allocates 2 bits per pin to set its mode:</p>
                            <div class="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 font-mono text-[10px]">
                                00: Input Mode (Reset State)<br>
                                01: General Purpose Output Mode<br>
                                10: Alternate Function Mode (for SPI/I2C/UART)<br>
                                11: Analog Mode
                            </div>
                        `
                    },
                    {
                        title: "Lesson 3.2: Output Types and Speeds (OTYPER and OSPEEDR)",
                        content: `
                            <p class="mb-4">Output pins can be configured as **Push-Pull** (active high and low driving) or **Open-Drain** (active pull to GND, requiring an external pull-up resistor to go HIGH). You must configure the pin speed (` + "`OSPEEDR`" + `) according to your signal frequency to manage power consumption and electromagnetic interference (EMI).</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What configuration mode must be set in MODER registers to interface with SPI or UART buses?", options: ["Input Mode (00)", "Output Mode (01)", "Alternate Function Mode (10)"], ans: 2 },
                        { q: "Which pin output type is ideal for shared I2C data lines?", options: ["Push-Pull", "Open-Drain", "High-Speed Pull"], ans: 1 },
                        { q: "What happens if you configure pin speed settings higher than needed?", options: ["It draws unnecessary power and increases EMI noise", "Pin gets damaged", "Voltage shifts higher"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Configure Pin PA5 as a General Purpose Output in bare-metal C code.",
                    components: ["STM32 Nucleo Board", "STM32CubeIDE"],
                    procedure: [
                        "Ensure GPIOA peripheral clock is enabled.",
                        "Clear bits 10 and 11 in GPIOA->MODER register.",
                        "Set bit 10 to configure Pin PA5 as an output."
                    ],
                    expectedOutput: "Pin PA5 output mode registers logic transitions, allowing you to toggle the onboard LED."
                }
            },
            {
                title: "Module 4: Timers",
                desc: "Prescalers, auto-reload values, and PWM generation.",
                duration: "60 Min",
                lessons: [
                    {
                        title: "Lesson 4.1: General Purpose Timers and Counter Blocks",
                        content: `
                            <p class="mb-4">Timers are hardware counters that count CPU clock cycles. They run independently of code execution, allowing precise timing without blocking main program loops.</p>
                            <p class="mb-4">A hardware timer block consists of:</p>
                            <ul class="list-disc pl-4 space-y-1">
                                <li><strong>Prescaler (PSC):</strong> Divides the input clock frequency to set the count rate.</li>
                                <li><strong>Counter Register (CNT):</strong> Counts clock ticks up or down.</li>
                                <li><strong>Auto-Reload Register (ARR):</strong> Sets the count limit. When the counter reaches this limit, it wraps back to 0 and triggers an update interrupt.</li>
                            </ul>
                        `
                    },
                    {
                        title: "Lesson 4.2: Frequency and Duty Cycle Math",
                        content: `
                            <p class="mb-4">To generate a specific timer interrupt frequency, use the following equation:</p>
                            <div class="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 font-mono text-[10px] text-center">
                                Frequency = Clock_Source / ((PSC + 1) * (ARR + 1))
                            </div>
                            <p>For example, if your system clock is 84 MHz, setting the prescaler to 83 and auto-reload to 999 yields a 1 kHz timer tick.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which register sets the timer's overflow limit?", options: ["CNT (Counter)", "ARR (Auto-Reload Register)", "PSC (Prescaler)"], ans: 1 },
                        { q: "If your system clock is 84 MHz and PSC is 0, what is the counter frequency?", options: ["84 MHz", "42 MHz", "1 MHz"], ans: 0 },
                        { q: "What event occurs when the counter wraps around at the ARR value?", options: ["DMA Trigger", "Baud rate change", "Update Interrupt"], ans: 2 }
                    ]
                },
                project: {
                    objective: "Configure TIMER 2 to count up and trigger an update event every 1 millisecond.",
                    components: ["STM32 Nucleo Board", "Timer configuration script"],
                    procedure: [
                        "Calculate PSC and ARR values for a 1 kHz frequency based on system clock speed.",
                        "Write calculated values into TIM2->PSC and TIM2->ARR registers.",
                        "Enable TIM2 counter module in TIM2->CR1 control register."
                    ],
                    expectedOutput: "TIM2 counter starts counting up, triggering update interrupts every 1ms."
                }
            },
            {
                title: "Module 5: Interrupts",
                desc: "Interrupt service routines, vectors, and NVIC registers.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 5.1: Interrupt Service Routines (ISRs)",
                        content: `
                            <p class="mb-4">Interrupts temporarily halt main program execution to run a dedicated function, the **Interrupt Service Routine (ISR)**, in response to hardware events (like button presses or timer overflows).</p>
                            <p class="mb-4">When an interrupt occurs:</p>
                            <ol class="list-decimal pl-4 space-y-1.5">
                                <li>The CPU saves its current state (register values) to the memory stack.</li>
                                <li>The CPU fetches the ISR address from the **Vector Table**.</li>
                                <li>The CPU jumps to the ISR function.</li>
                                <li>The CPU restores its state and resumes main execution.</li>
                            </ol>
                        `
                    },
                    {
                        title: "Lesson 5.2: The Nested Vectored Interrupt Controller (NVIC)",
                        content: `
                            <p class="mb-4">The Nested Vectored Interrupt Controller (NVIC) manages all interrupt requests. It resolves priority conflicts when multiple interrupts occur at the same time. You must enable interrupts in the NVIC register map and write code inside the ISR to **clear the interrupt flag** to prevent the ISR from re-triggering immediately.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Where does the CPU store register values when entering an interrupt handler?", options: ["Flash Memory", "Stack memory", "Baud rate buffers"], ans: 1 },
                        { q: "What happens if an ISR does not clear its interrupt flag before returning?", options: ["MCU burns out", "Interrupt executes in infinite loop", "Variable gets erased"], ans: 1 },
                        { q: "Which peripheral manages interrupt priorities on ARM Cortex-M MCUs?", options: ["SysTick", "NVIC", "EXTI"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Write an ISR handler for an external push-button interrupt on Pin PA0.",
                    components: ["STM32 Nucleo Board"],
                    procedure: [
                        "Configure EXTI registers to detect falling edges on Pin PA0.",
                        "Enable EXTI0 interrupt line in the NVIC controller.",
                        "Write EXTI0_IRQHandler() function, making sure to clear the pending register bit."
                    ],
                    expectedOutput: "Pressing the push-button immediately triggers the ISR, toggling the output status."
                }
            },
            {
                title: "Module 6: UART",
                desc: "Register-level UART communications, baud rate generators, and buffers.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 6.1: Writing a bare-metal UART Driver",
                        content: `
                            <p class="mb-4">To write a register-level UART driver, you must set the word length, parity bits, and stop bits in the UART Control Registers (e.g. ` + "`USART_CR1`" + ` and ` + "`USART_CR2`" + `).</p>
                            <p class="mb-4">You must configure the baud rate by writing to the **Baud Rate Register (BRR)**. The BRR divides the bus clock frequency to set the transmission speed:</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
USART1->BRR = (Bus_Clock + BaudRate/2) / BaudRate;</pre>
                        `
                    },
                    {
                        title: "Lesson 6.2: Transmit and Receive Buffers",
                        content: `
                            <p class="mb-4">Data is transmitted and received by accessing the data register (DR or TDR/RDR). Before writing new data to the transmit buffer, you must poll the **Transmit Data Register Empty (TXE)** flag in the status register to ensure the previous byte has finished sending.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which register controls the baud rate settings in a UART peripheral?", options: ["USART_CR1", "USART_BRR", "USART_DR"], ans: 1 },
                        { q: "What flag must be checked before writing a byte to the transmit buffer?", options: ["RXNE (Rx Not Empty)", "TXE (Tx Empty)", "TC (Transmission Complete)"], ans: 1 },
                        { q: "Why do we poll status flags in bare-metal drivers?", options: ["To prevent data corruption", "To run calculations", "To reset registers"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Write a C function `UART_SendChar(char c)` that polls the status register and sends a byte.",
                    components: ["STM32 Nucleo Board"],
                    procedure: [
                        "Wait until USART1->SR status register has the TXE flag bit set.",
                        "Write char parameter to USART1->DR data register."
                    ],
                    expectedOutput: "Calling the function successfully prints characters in your serial monitor utility."
                }
            },
            {
                title: "Module 7: SPI",
                desc: "Master/slave register configurations and timing rules.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 7.1: Serial Peripheral Interface (SPI) Protocol",
                        content: `
                            <p class="mb-4">The Serial Peripheral Interface (SPI) is a synchronous, full-duplex, master-slave serial protocol. It uses a shared clock line to synchronize data transfer, resulting in higher speeds than asynchronous protocols like UART.</p>
                            <p class="mb-4">SPI uses four lines:</p>
                            <ul class="list-disc pl-4 space-y-1">
                                <li><strong>SCLK:</strong> Serial Clock (generated by Master).</li>
                                <li><strong>MOSI:</strong> Master Output, Slave Input.</li>
                                <li><strong>MISO:</strong> Master Input, Slave Output.</li>
                                <li><strong>CS / SS:</strong> Chip Select / Slave Select (active LOW).</li>
                            </ul>
                        `
                    },
                    {
                        title: "Lesson 7.2: Clock Phase and Polarity Configurations",
                        content: `
                            <p class="mb-4">The Master and Slave must use the same clock settings, configured in the control registers via **CPOL (Clock Polarity)** and **CPHA (Clock Phase)** parameters:</p>
                            <ul class="list-disc pl-4 space-y-1">
                                <li><strong>CPOL=0:</strong> Clock is LOW when idle.</li>
                                <li><strong>CPOL=1:</strong> Clock is HIGH when idle.</li>
                                <li><strong>CPHA=0:</strong> Data is sampled on the first clock edge.</li>
                                <li><strong>CPHA=1:</strong> Data is sampled on the second clock edge.</li>
                            </ul>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which pin line is used by the SPI master to select a specific slave?", options: ["SCLK", "CS (Chip Select)", "MOSI"], ans: 1 },
                        { q: "How many clock lines does the SPI protocol use?", options: ["Exactly one", "Two", "Zero (Asynchronous)"], ans: 0 },
                        { q: "What clock phase CPHA configuration causes sampling on the second edge?", options: ["CPHA = 0", "CPHA = 1", "CPHA = 2"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Write SPI transmit routine to send command register values to an external sensor.",
                    components: ["STM32 Board", "SPI EEPROM Memory"],
                    procedure: [
                        "Enable SPI1 peripheral clock tree.",
                        "Set Master configuration mode in SPI1->CR1 register.",
                        "Write character values to DR register and wait for completion flag."
                    ],
                    expectedOutput: "The SPI clock outputs regular pulses, and data appears on the MOSI line."
                }
            },
            {
                title: "Module 8: I2C",
                desc: "Inter-Integrated Circuit bus communication, addressing, and start/stop conditions.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 8.1: The Inter-Integrated Circuit (I2C) Bus",
                        content: `
                            <p class="mb-4">I2C is a half-duplex serial protocol that allows a master device to communicate with multiple slave devices on a shared bus using only two lines:</p>
                            <ul class="list-disc pl-4 space-y-1 mb-4">
                                <li><strong>SDA:</strong> Serial Data.</li>
                                <li><strong>SCL:</strong> Serial Clock.</li>
                            </ul>
                            <p>Both SDA and SCL lines are open-drain and require pull-up resistors to keep the lines HIGH when idle. Devices are addressed digitally using 7-bit unique IDs.</p>
                        `
                    },
                    {
                        title: "Lesson 8.2: Start, Address, and Stop Handshakes",
                        content: `
                            <p class="mb-4">I2C communications follow a strict sequence of start and stop conditions:</p>
                            <ul class="list-disc pl-4 space-y-1">
                                <li><strong>START Condition:</strong> SDA transitions from HIGH to LOW while SCL is HIGH.</li>
                                <li><strong>Slave Address:</strong> Master transmits the 7-bit address followed by a Read/Write bit.</li>
                                <li><strong>Acknowledge (ACK):</strong> The addressed slave pulls SDA LOW to acknowledge the transfer.</li>
                                <li><strong>STOP Condition:</strong> SDA transitions from LOW to HIGH while SCL is HIGH.</li>
                            </ul>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which lines are used by the I2C communication protocol?", options: ["MOSI / MISO", "TX / RX", "SDA / SCL"], ans: 2 },
                        { q: "What logic state transition defines an I2C START condition?", options: ["SDA transition HIGH-to-LOW when SCL is HIGH", "SDA transition LOW-to-HIGH when SCL is HIGH", "SCL pulse"], ans: 0 },
                        { q: "How many bits are typically used for device addressing in I2C?", options: ["8-bit", "7-bit", "16-bit"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Write an I2C driver routine that sends a start condition and transmits a slave address byte.",
                    components: ["STM32 Board", "I2C Sensor"],
                    procedure: [
                        "Configure I2C Peripheral registers and bus clock speed.",
                        "Set I2C1->CR1 Start bit.",
                        "Wait for start condition flag to clear, then write address register values."
                    ],
                    expectedOutput: "The I2C start condition is generated, and data is transmitted on the SDA line."
                }
            },
            {
                title: "Module 9: Embedded Project",
                desc: "Developing a bare-metal C data logger.",
                duration: "60 Min",
                lessons: [
                    {
                        title: "Lesson 9.1: Project Specifications and Requirements",
                        content: `
                            <p class="mb-4">This capstone project combines the concepts from the previous modules into a single embedded application: a **Bare-Metal C Data Logger**.</p>
                            <p class="mb-4">The application will configure GPIO registers, set up a 1 ms timer, read sensor data via an ADC, and transmit the formatted logs over a UART interface at 9600 baud rate.</p>
                        `
                    },
                    {
                        title: "Lesson 9.2: Complete Integrated Application Logic",
                        content: `
                            <p class="mb-4">Review the core bare-metal C application structure:</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
int main(void) {
  // 1. Enable GPIO & USART clock trees
  RCC->AHB1ENR |= RCC_AHB1ENR_GPIOAEN;
  RCC->APB2ENR |= RCC_APB2ENR_USART1EN;
  
  // 2. Configure Pin PA5 as Output (LED)
  GPIOA->MODER &= ~(3UL << 10);
  GPIOA->MODER |= (1UL << 10);
  
  // 3. Configure USART1 Tx (PA9) Alternate Mode
  GPIOA->MODER &= ~(3UL << 18);
  GPIOA->MODER |= (2UL << 18);
  GPIOA->AFR[1] |= (7UL << 4); // Alternate Function 7 (USART1)
  
  // 4. Configure Baud Rate to 9600
  USART1->BRR = 16000000 / 9600;
  USART1->CR1 |= (USART_CR1_TE | USART_CR1_UE);
  
  while(1) {
    GPIOA->ODR ^= (1UL << 5); // Toggle LED
    UART_SendString("Log entry: LED Toggled\\n");
    delay_ms(1000);
  }
}</pre>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which register controls the alternate function mapping on STM32 microcontrollers?", options: ["GPIOA_MODER", "GPIOA_AFR", "GPIOA_ODR"], ans: 1 },
                        { q: "Which bit in the RCC register enables the GPIO Port A clock tree?", options: ["RCC_AHB1ENR_GPIOAEN", "RCC_APB2ENR_USART1EN", "RCC_CR_HSION"], ans: 0 },
                        { q: "What baud rate is selected in the capstone project configuration code?", options: ["115200", "9600", "4800"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Compile and run the bare-metal C data logger firmware.",
                    components: ["STM32 Nucleo Board", "USB debugger"],
                    procedure: [
                        "Setup project workspace in Keil/STM32CubeIDE.",
                        "Write system configuration code and integrated main loops.",
                        "Compile and upload firmware. Verify UART telemetry outputs."
                    ],
                    expectedOutput: "The onboard LED blinks regularly, and 'Log entry: LED Toggled' prints in the serial console every second."
                }
            }
        ]
    },
    "esp32-iot-development": {
        category: "AIoT",
        title: "ESP32 & IoT Development",
        desc: "Build IoT systems using ESP32, Wi-Fi, MQTT, and cloud services.",
        difficulty: "Intermediate",
        duration: "10 Hours",
        lessons: 25,
        whatYouWillLearn: [
            "ESP32 dual-core Tensilica architecture and memory maps",
            "Configuring ESP32 Wi-Fi station and AP configurations",
            "MQTT publish and subscribe handshakes",
            "Interfacing environmental analog sensor arrays",
            "Routing telemetry values to cloud platforms",
            "Designing web-based dashboard gauges and charts",
            "IoT Capstone: Complete low-power remote sensing nodes"
        ],
        skillsGained: [
            "IoT Systems Integration",
            "MQTT Telemetry Networks",
            "Cloud Platform Ingestion",
            "Low-Power Configuration"
        ],
        careerRelevance: "Essential skills for IoT solutions developers, smart-device firmware engineers, and automation engineers.",
        toolsRequired: "ESP32 NodeMCU board, DHT22 sensor, active Wi-Fi internet connection, Cloud IoT Account (e.g. ThingsSpeak or HiveMQ Cloud).",
        prerequisites: [
            "Basic microcontroller programming skills",
            "Basic knowledge of internet protocols"
        ],
        certDetail: {
            available: "Yes",
            assessment: "Practical Assessment Required",
            verification: "Supported (Database verification)",
            idPrefix: "TL-2026-00003"
        },
        modules: [
            {
                title: "Module 1: ESP32 Overview",
                desc: "Silicon architecture, memory maps, and setup environments.",
                duration: "45 Min",
                lessons: [
                    {
                        title: "Lesson 1.1: ESP32 Silicon Capabilities",
                        content: `
                            <p class="mb-4">The ESP32 is a low-cost, low-power system on a chip (SoC) with integrated Wi-Fi and dual-mode Bluetooth. It features a 32-bit Xtensa dual-core microprocessor running at up to 240 MHz.</p>
                            <p class="mb-4">Key specs:</p>
                            <ul class="list-disc pl-4 space-y-1">
                                <li>520 KB of internal SRAM.</li>
                                <li>Integrated Wi-Fi (802.11 b/g/n) and BLE.</li>
                                <li>Hardware cryptographic accelerators.</li>
                                <li>Ultra-Low Power (ULP) co-processor.</li>
                            </ul>
                        `
                    },
                    {
                        title: "Lesson 1.2: ESP-IDF vs Arduino Frameworks",
                        content: `
                            <p class="mb-4">Developers can program the ESP32 using the official **ESP-IDF (Espressif IoT Development Framework)** or the **Arduino IDE**. ESP-IDF offers register-level access and uses the FreeRTOS real-time operating system. The Arduino framework abstracts many of these configurations, allowing fast prototyping.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the CPU word size of the ESP32 Xtensa processor?", options: ["8-bit", "16-bit", "32-bit"], ans: 2 },
                        { q: "How much internal SRAM is embedded in the ESP32 SoC?", options: ["32 KB", "520 KB", "2 MB"], ans: 1 },
                        { q: "What operating system runs under the hood in ESP-IDF configurations?", options: ["FreeRTOS", "Linux", "Windows IoT"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Configure your IDE with the ESP32 board manager package and upload a basic firmware query sketch.",
                    components: ["ESP32 board", "USB cable"],
                    procedure: [
                        "Add the Espressif package URL to your IDE board manager preferences.",
                        "Install the latest ESP32 core libraries.",
                        "Upload sketch calling ESP.getChipRevision() and log output."
                    ],
                    expectedOutput: "The serial monitor output prints the ESP32 silicon revision ID successfully."
                }
            },
            {
                title: "Module 2: Wi-Fi Connectivity",
                desc: "Connecting to wireless access points and handling link drop events.",
                duration: "45 Min",
                lessons: [
                    {
                        title: "Lesson 2.1: ESP32 Wi-Fi Modes",
                        content: `
                            <p class="mb-4">The ESP32's Wi-Fi peripheral can operate in different modes:</p>
                            <ul class="list-disc pl-4 space-y-1 mb-4">
                                <li><strong>Station (STA) Mode:</strong> The ESP32 connects to an existing Wi-Fi router.</li>
                                <li><strong>Access Point (AP) Mode:</strong> The ESP32 acts as a router, allowing other devices to connect to it.</li>
                            </ul>
                        `
                    },
                    {
                        title: "Lesson 2.2: Managing Wi-Fi Connection Events",
                        content: `
                            <p class="mb-4">Use the ` + "`WiFi.h`" + ` library to initialize connections and monitor link status:</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
#include &lt;WiFi.h&gt;
void setup() {
  WiFi.begin("SSID_NAME", "PASSWORD");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected!");
}</pre>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which mode allows the ESP32 to connect to a local home router?", options: ["Access Point (AP) Mode", "Station (STA) Mode", "Master Mode"], ans: 1 },
                        { q: "What library manages wireless network connections in the Arduino environment?", options: ["SPI.h", "WiFi.h", "Wire.h"], ans: 1 },
                        { q: "Which function call starts the Wi-Fi connection process?", options: ["WiFi.status()", "WiFi.begin()", "WiFi.connect()"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Write a sketch that connects your ESP32 to a Wi-Fi network and prints its local IP address.",
                    components: ["ESP32 Board", "Wi-Fi Router credentials"],
                    procedure: [
                        "Configure Wi-Fi STA mode and pass SSID and password strings.",
                        "Use while loop to wait for WiFi.status() to equal WL_CONNECTED.",
                        "Print WiFi.localIP() to the Serial Monitor."
                    ],
                    expectedOutput: "The serial monitor prints a local IP address (e.g. 192.168.1.15) once connected."
                }
            },
            {
                title: "Module 3: MQTT",
                desc: "Publishing and subscribing to telemetry streams via brokers.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 3.1: The MQTT Protocol",
                        content: `
                            <p class="mb-4">Message Queuing Telemetry Transport (MQTT) is a lightweight publish/subscribe messaging protocol designed for resource-constrained IoT devices.</p>
                            <p class="mb-4">Unlike HTTP, which uses a client-server request-response model, MQTT clients publish messages to a central **Broker** on specific **Topics** (e.g., ` + "`device/sensor`" + `). Other clients can subscribe to topics to receive messages in real-time.</p>
                        `
                    },
                    {
                        title: "Lesson 3.2: Connecting a Client and Handling Callbacks",
                        content: `
                            <p class="mb-4">Using libraries like ` + "`PubSubClient`" + `, you can configure MQTT connection strings, publish telemetry data, and handle incoming commands via callback functions.</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
#include &lt;PubSubClient.h&gt;
WiFiClient espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* payload, unsigned int length) {
  // Handle incoming messages on subscribed topics
}</pre>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What communication model does the MQTT protocol use?", options: ["Request-Response", "Publish-Subscribe", "Master-Slave"], ans: 1 },
                        { q: "What standard TCP port is used for unencrypted MQTT brokers?", options: ["80", "443", "1883"], ans: 2 },
                        { q: "What central node distributes messages in an MQTT network?", options: ["The Client", "The Broker", "The Server"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Connect your ESP32 to a public MQTT broker and publish a test message.",
                    components: ["ESP32 Board", "Active internet link"],
                    procedure: [
                        "Initialize Wi-Fi and set the MQTT broker address (e.g., broker.hivemq.com).",
                        "Call client.connect() inside your main loop.",
                        "Publish a test message to 'thrulabs/test' topic using client.publish()."
                    ],
                    expectedOutput: "The test message appears on the broker's web dashboard immediately."
                }
            },
            {
                title: "Module 4: Sensors",
                desc: "Interfacing the DHT22 temperature and humidity sensor.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 4.1: DHT22 Single-Bus Communication",
                        content: `
                            <p class="mb-4">The DHT22 is a high-accuracy digital sensor that measures temperature and relative humidity. It uses a custom single-bus serial protocol, sending 40 bits of data over a single wire.</p>
                            <p class="mb-4">This data package includes:</p>
                            <ul class="list-disc pl-4 space-y-1">
                                <li>16 bits of humidity data.</li>
                                <li>16 bits of temperature data.</li>
                                <li>8 checksum bits to verify data integrity.</li>
                            </ul>
                        `
                    },
                    {
                        title: "Lesson 4.2: Reading and Formatting Data",
                        content: `
                            <p class="mb-4">We can read sensor values easily using the Adafruit DHT library:</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
#include &lt;DHT.h&gt;
#define DHTPIN 4
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  dht.begin();
}
void loop() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();
}</pre>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "How many bits are transmitted in a single data frame from the DHT22 sensor?", options: ["8 bits", "32 bits", "40 bits"], ans: 2 },
                        { q: "What pin type is used by the DHT22 sensor to send data?", options: ["Single-bus digital data pin", "Analog ADC pin", "I2C SDA line"], ans: 0 },
                        { q: "Which class from the Adafruit library represents the DHT sensor?", options: ["Adafruit_DHT", "DHT", "Sensor_DHT"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Connect a DHT22 sensor to Pin 4 and read its temperature and humidity output.",
                    components: ["ESP32 Board", "DHT22 Sensor", "Breadboard", "10kΩ pull-up resistor", "Wires"],
                    procedure: [
                        "Connect DHT22 Pin 1 to 3.3V, Pin 4 to GND.",
                        "Connect Pin 2 to ESP32 Pin 4 with a 10kΩ pull-up resistor to VCC.",
                        "Upload the DHT sensor reading sketch and monitor outputs."
                    ],
                    expectedOutput: "The Serial Monitor prints temperature and humidity readouts in real-time."
                }
            },
            {
                title: "Module 5: Cloud Platforms",
                desc: "Configuring cloud channels, data structures, and APIs.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 5.1: IoT Cloud Gateways",
                        content: `
                            <p class="mb-4">IoT Cloud Gateways allow devices to send data to cloud databases for storage and analysis. Popular platforms (like ThingsSpeak, Adafruit IO, or AWS IoT Core) offer APIs to register devices and map sensor values to specific data channels or fields.</p>
                        `
                    },
                    {
                        title: "Lesson 5.2: Writing JSON Payloads",
                        content: `
                            <p class="mb-4">Using libraries like ` + "`ArduinoJson`" + `, you can format raw sensor measurements into structured JSON strings before transmission. This allows the cloud database to easily parse and store different data fields:</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
StaticJsonDocument&lt;200&gt; doc;
doc["temp"] = 24.5;
doc["humi"] = 60.8;
char buffer[256];
serializeJson(doc, buffer); // Outputs: {"temp":24.5,"humi":60.8}</pre>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which library is commonly used to format JSON structured payloads in C++?", options: ["Wire.h", "ArduinoJson", "PubSubClient"], ans: 1 },
                        { q: "What does API stand for in cloud system design?", options: ["Application Programming Interface", "Analog Peripheral Input", "Advanced Power Integration"], ans: 0 },
                        { q: "Why do we format payloads using the JSON syntax?", options: ["To encrypt data", "To package multiple structured fields in a readable text format", "To increase speeds"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Write a function that package variables into a JSON format string and logs it.",
                    components: ["ESP32 Board", "IDE"],
                    procedure: [
                        "Include the ArduinoJson library in your sketch.",
                        "Create a JSON document object and assign test variables.",
                        "Serialize the object and output the formatted string to the console."
                    ],
                    expectedOutput: "The Serial Monitor outputs a correctly formatted JSON string: `{\"temp\":...}`."
                }
            },
            {
                title: "Module 6: Dashboard Creation",
                desc: "Setting up web widgets, dials, and interactive buttons.",
                duration: "45 Min",
                lessons: [
                    {
                        title: "Lesson 6.1: Real-Time Web Widgets",
                        content: `
                            <p class="mb-4">Web dashboards visualize IoT data using widgets like dials, line graphs, and control switches. These widgets connect to the cloud platform's API and update automatically when the database receives new data from your device.</p>
                        `
                    },
                    {
                        title: "Lesson 6.2: Device Status & Keep-Alive Pings",
                        content: `
                            <p class="mb-4">To ensure your device is online, you should configure a 'Keep-Alive' ping. The device sends a small diagnostic signal at regular intervals, and the dashboard displays an alert if the signal stops, indicating a connection issue.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the purpose of keep-alive pings?", options: ["To increase sensor resolution", "To verify the device is online and connected", "To download updates"], ans: 1 },
                        { q: "Which widget is ideal for visualizing historical sensor readings over time?", options: ["Line graph chart", "Status indicator LED", "Dials"], ans: 0 },
                        { q: "How do dashboard widgets fetch the latest device data?", options: ["Via cloud platform APIs", "By accessing the CPU register directly", "By querying local memory"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Configure a line graph widget on your cloud dashboard to display simulated sensor readings.",
                    components: ["Cloud IoT account"],
                    procedure: [
                        "Log in to your cloud IoT platform account.",
                        "Create a new widget panel and choose 'Line Graph'.",
                        "Link the widget to your device's data channel or field."
                    ],
                    expectedOutput: "The line graph updates and plots points as data is received."
                }
            },
            {
                title: "Module 7: IoT Project",
                desc: "Low-power remote telemetry node with Deep Sleep mode.",
                duration: "60 Min",
                lessons: [
                    {
                        title: "Lesson 7.1: Power Management & Deep Sleep",
                        content: `
                            <p class="mb-4">Battery-powered IoT devices spend most of their time waiting between measurements. To save power, you can use the ESP32's **Deep Sleep** mode.</p>
                            <p class="mb-4">During deep sleep, the CPU, Wi-Fi, and main peripherals are powered down, reducing current draw to **under 10µA**. An internal RTC timer keeps track of time and wakes the CPU when it's time to take another reading.</p>
                        `
                    },
                    {
                        title: "Lesson 7.2: Deep Sleep Setup in Code",
                        content: `
                            <p class="mb-4">Review the code to configure Deep Sleep on the ESP32:</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
#define uS_TO_S_FACTOR 1000000ULL
#define TIME_TO_SLEEP  600 // Sleep for 10 minutes

void setup() {
  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
  
  // 1. Initialize Wi-Fi
  // 2. Read DHT22 Sensor
  // 3. Publish payload to MQTT broker
  
  Serial.println("Entering deep sleep...");
  esp_deep_sleep_start(); // CPU shuts down
}</pre>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the typical current draw of the ESP32 during Deep Sleep?", options: ["50 mA", "10 micro-Amps", "1 A"], ans: 1 },
                        { q: "Which component stays active to wake the CPU from deep sleep?", options: ["Wi-Fi Radio", "RTC Timer", "SRAM Controller"], ans: 1 },
                        { q: "What function call begins the deep sleep cycle?", options: ["esp_deep_sleep_start()", "WiFi.disconnect()", "esp_sleep_timer_wakeup()"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Assemble and code the low-power remote telemetry node.",
                    components: ["ESP32 Board", "DHT22 Sensor", "Breadboard", "Wires"],
                    procedure: [
                        "Wire the DHT22 sensor to Pin 4.",
                        "Upload the deep sleep telemetry sketch.",
                        "Verify that data is published to your dashboard, and the device enters sleep."
                    ],
                    expectedOutput: "The device wakes up, publishes sensor data, and enters deep sleep, repeating the cycle as programmed."
                }
            }
        ]
    },
    "digital-electronics": {
        category: "Electronics & Communication",
        title: "Digital Electronics Fundamentals",
        desc: "Learn logic gates, Boolean algebra, combinational and sequential circuits.",
        difficulty: "Beginner",
        duration: "8 Hours",
        lessons: 20,
        whatYouWillLearn: [
            "Logic gates (AND, OR, NOT, NAND, NOR, XOR)",
            "Boolean algebra and De Morgan's laws",
            "Karnaugh Maps (K-Maps) minimization rules",
            "Combinational logic design (adders, multiplexers)",
            "Sequential circuits, flip-flop logic, and clocks",
            "Designing ripple and synchronous counters",
            "Shift registers and conversion layouts",
            "FSM design (Moore and Mealy state models)"
        ],
        skillsGained: [
            "Digital Logic Design",
            "Circuit Optimization",
            "FSM Architecture",
            "Timing Analysis"
        ],
        careerRelevance: "Essential skills for digital systems designers, FPGA developers, and logic synthesis engineers.",
        toolsRequired: "Digital logic simulator (Logisim or online circuit builder), breadboard, 74-series logic gate ICs (7408, 7432, 7404).",
        prerequisites: [
            "Basic Computer Knowledge",
            "No Prior Arduino Experience Required"
        ],
        hasCertificate: false,
        certDetail: {
            available: "No",
            assessment: "Practical Assessment Required",
            verification: "Not Supported",
            idPrefix: "TL-2026-NOCERT"
        },
        modules: [
            {
                title: "Module 1: Logic Gates",
                desc: "Logic gates, operations, truth tables, and universality.",
                duration: "45 Min",
                lessons: [
                    {
                        title: "Lesson 1.1: Standard Logic Gate Operations",
                        content: `
                            <p class="mb-4">Digital logic systems process binary data (HIGH/1/5V or LOW/0/0V) using **Logic Gates**. The basic logic gates are:</p>
                            <ul class="list-disc pl-4 space-y-1 mb-4">
                                <li><strong>AND:</strong> Output is HIGH only if all inputs are HIGH ($Y = A \cdot B$).</li>
                                <li><strong>OR:</strong> Output is HIGH if at least one input is HIGH ($Y = A + B$).</li>
                                <li><strong>NOT:</strong> Inverts the input signal ($Y = \bar{A}$).</li>
                            </ul>
                        `
                    },
                    {
                        title: "Lesson 1.2: NAND and NOR Universal Logic",
                        content: `
                            <p class="mb-4">NAND and NOR gates are called **Universal Gates** because any boolean logic function (AND, OR, NOT) can be implemented using only NAND or only NOR gates. This simplifies manufacturing, as a single chip type can be used for the entire circuit.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the boolean output of an AND gate if inputs are A=1 and B=0?", options: ["0", "1", "High Impedance"], ans: 0 },
                        { q: "Which gates are classified as universal gates?", options: ["AND / OR", "NAND / NOR", "XOR / XNOR"], ans: 1 },
                        { q: "Which logic function outputs 1 only when inputs are different?", options: ["AND", "OR", "XOR"], ans: 2 }
                    ]
                },
                project: {
                    objective: "Build an OR gate using only NAND gates in your simulator.",
                    components: ["Logic simulator workspace"],
                    procedure: [
                        "Invert inputs A and B using NAND gates as NOT gates.",
                        "Route the inverted inputs into a third NAND gate.",
                        "Test all input combinations to verify the OR gate truth table."
                    ],
                    expectedOutput: "The output matches the OR gate truth table (0 only when both inputs are 0)."
                }
            },
            {
                title: "Module 2: Boolean Algebra",
                desc: "Logic minimization, De Morgan's laws, and expressions.",
                duration: "40 Min",
                lessons: [
                    {
                        title: "Lesson 2.1: Boolean Theorems",
                        content: `
                            <p class="mb-4">Boolean algebra provides rules to simplify logic expressions, reducing the number of gates needed to build a circuit. Key theorems include:</p>
                            <div class="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 font-mono text-[10px]">
                                Identity: A + 0 = A, A · 1 = A<br>
                                Complement: A + A' = 1, A · A' = 0<br>
                                Idempotent: A + A = A, A · A = A
                            </div>
                        `
                    },
                    {
                        title: "Lesson 2.2: De Morgan's Laws",
                        content: `
                            <p class="mb-4">De Morgan's Laws allow you to convert expressions between AND and OR forms using inverters. The laws state:</p>
                            <div class="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 font-mono text-[10px] text-center">
                                Law 1: $\overline{A \cdot B} = \bar{A} + \bar{B}$<br>
                                Law 2: $\overline{A + B} = \bar{A} \cdot \bar{B}$
                            </div>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Simplify the boolean expression: A + A'B.", options: ["A + B", "AB", "A"], ans: 0 },
                        { q: "According to De Morgan's Laws, what is the equivalent of the expression (A + B)'?", options: ["A' + B'", "A' · B'", "AB"], ans: 1 },
                        { q: "What is the result of the boolean operation A · A'?", options: ["1", "A", "0"], ans: 2 }
                    ]
                },
                project: {
                    objective: "Minimize the expression Y = AB + AB' and test it in your simulator.",
                    components: ["Logic simulator workspace"],
                    procedure: [
                        "Simplify the expression mathematically (AB + AB' = A(B+B') = A).",
                        "Build the original circuit (Y = AB + AB') and the simplified circuit (Y = A).",
                        "Verify that both circuits produce identical output for all inputs."
                    ],
                    expectedOutput: "Both circuits behave identically, verifying the simplification."
                }
            },
            {
                title: "Module 3: K-Maps",
                desc: "Logic minimization using Karnaugh Maps.",
                duration: "40 Min",
                lessons: [
                    {
                        title: "Lesson 3.1: Karnaugh Maps (K-Maps) Structure",
                        content: `
                            <p class="mb-4">Karnaugh Maps (K-Maps) provide a visual method to simplify boolean expressions, reducing the chance of algebraic errors. K-Maps use a grid where adjacent cells differ by only a single bit, using **Gray Code** order (00, 01, 11, 10).</p>
                        `
                    },
                    {
                        title: "Lesson 3.2: Grouping Cells to Simplify Logic",
                        content: `
                            <p class="mb-4">We simplify logic by grouping adjacent 1s in the K-Map grid in groups of sizes that are powers of 2 (1, 2, 4, 8, etc.). The larger the group, the more terms are eliminated, resulting in a simpler final expression.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What coding order is used for K-Map rows and columns?", options: ["Binary code", "Gray Code", "BCD Code"], ans: 1 },
                        { q: "What is the allowed group size in a K-Map?", options: ["Any size", "Powers of 2 (1, 2, 4, 8, etc.)", "Even numbers only"], ans: 1 },
                        { q: "How many variables can a 16-cell K-Map minimize?", options: ["2", "3", "4"], ans: 2 }
                    ]
                },
                project: {
                    objective: "Simplify a 3-variable truth table using a K-Map and build the optimized circuit.",
                    components: ["Logic simulator workspace"],
                    procedure: [
                        "Fill out a 3-variable K-Map grid based on your target truth table.",
                        "Group the 1s and write down the simplified expression.",
                        "Build the circuit in your simulator and verify it matches the truth table."
                    ],
                    expectedOutput: "The optimized circuit produces correct outputs using fewer gates."
                }
            },
            {
                title: "Module 4: Combinational Circuits",
                desc: "Designing half/full adders, encoders, and decoders.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 4.1: Half Adders and Full Adders",
                        content: `
                            <p class="mb-4">Combinational circuits have outputs that depend only on their current inputs. A basic example is the **Half Adder**, which adds two 1-bit inputs and outputs a Sum (S) and Carry (C):</p>
                            <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
Sum = A ⊕ B  (XOR)
Carry = A · B (AND)</pre>
                            <p class="mb-4">A **Full Adder** adds three inputs (A, B, and a Carry Input from a previous stage), allowing you to chain them together to add larger binary numbers.</p>
                        `
                    },
                    {
                        title: "Lesson 4.2: Multiplexers (MUX)",
                        content: `
                            <p class="mb-4">A Multiplexer (MUX) acts as a digital switch, selecting one of multiple input data lines and routing it to a single output line based on binary **Select Lines**.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which gate generates the Sum output in a Half Adder circuit?", options: ["AND", "XOR", "NOT"], ans: 1 },
                        { q: "How many inputs does a Full Adder accept?", options: ["Two", "Three", "Four"], ans: 1 },
                        { q: "What is the job of a Multiplexer (MUX)?", options: ["Store data", "Select one of multiple inputs to route to the output", "Invert signals"], ans: 2 }
                    ]
                },
                project: {
                    objective: "Build a Full Adder circuit using logic gates in your simulator.",
                    components: ["Logic simulator workspace"],
                    procedure: [
                        "Combine two Half Adders and an OR gate.",
                        "Map inputs (A, B, Carry-In) and outputs (Sum, Carry-Out).",
                        "Test all input combinations to verify correct addition behavior."
                    ],
                    expectedOutput: "The circuit adds inputs correctly, producing the correct sum and carry outputs."
                }
            },
            {
                title: "Module 5: Sequential Circuits",
                desc: "Latches, flip-flops, and clock triggers.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 5.1: Latches vs Flip-Flops",
                        content: `
                            <p class="mb-4">Unlike combinational circuits, **Sequential Circuits** have outputs that depend on both current inputs and past states, using memory elements. The basic memory elements are:</p>
                            <ul class="list-disc pl-4 space-y-1 mb-4">
                                <li><strong>Latches:</strong> Level-triggered (outputs change whenever the enable input is active).</li>
                                <li><strong>Flip-Flops:</strong> Edge-triggered (outputs change only on the rising or falling edge of a clock signal).</li>
                            </ul>
                        `
                    },
                    {
                        title: "Lesson 5.2: The D Flip-Flop",
                        content: `
                            <p class="mb-4">The D (Data) Flip-Flop captures the input value at the clock edge and holds it until the next clock cycle. This makes it ideal for register memory and synchronous circuit design.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the difference between latches and flip-flops?", options: ["Latches use feedback, flip-flops do not", "Latches are level-triggered, flip-flops are edge-triggered", "Size"], ans: 1 },
                        { q: "On what event does a D Flip-Flop update its output?", options: ["Any change in D input", "A clock signal edge", "Power reset"], ans: 1 },
                        { q: "Which flip-flop toggles its output when both control inputs are HIGH?", options: ["D Flip-Flop", "SR Flip-Flop", "JK Flip-Flop"], ans: 2 }
                    ]
                },
                project: {
                    objective: "Connect an edge-triggered D Flip-Flop in your simulator and verify its memory function.",
                    components: ["Logic simulator workspace"],
                    procedure: [
                        "Place a D Flip-Flop component, connecting a button to the D input and a clock source to the clock input.",
                        "Toggle the D input button and observe the output.",
                        "Pulse the clock input and verify that the output updates to match the D input and holds that value."
                    ],
                    expectedOutput: "The output updates only on the clock edge, verifying the memory function."
                }
            },
            {
                title: "Module 6: Counters",
                desc: "Synchronous and asynchronous counter design.",
                duration: "55 Min",
                lessons: [
                    {
                        title: "Lesson 6.1: Asynchronous (Ripple) Counters",
                        content: `
                            <p class="mb-4">Counters are sequential circuits that progress through a defined sequence of binary states when clocked. In an **Asynchronous (Ripple) Counter**, the clock signal is connected only to the first flip-flop. Each subsequent stage is clocked by the output of the previous stage, causing changes to ripple through the counter.</p>
                        `
                    },
                    {
                        title: "Lesson 6.2: Synchronous Counters",
                        content: `
                            <p class="mb-4">To avoid timing delays and hazards (glitches) caused by propagation delay in ripple counters, we use **Synchronous Counters**. In a synchronous counter, the clock signal is connected to all flip-flops simultaneously, causing them to update at the exact same instant.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Why do ripple counters have timing delays?", options: ["They use slow gates", "Outputs change at different times as the clock ripples through the stages", "They require high voltage"], ans: 1 },
                        { q: "Which counter clocks all flip-flops at the exact same time?", options: ["Ripple Counter", "Synchronous Counter", "Asynchronous Counter"], ans: 1 },
                        { q: "What is the maximum count of a 3-bit binary counter?", options: ["3", "7", "8"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Build a 3-bit Synchronous Up-Counter in your simulator.",
                    components: ["Logic simulator workspace"],
                    procedure: [
                        "Configure 3 JK Flip-Flops in toggle mode.",
                        "Connect the clock line to all flip-flops.",
                        "Design logic: JK inputs are controlled by the outputs of the previous stages."
                    ],
                    expectedOutput: "The counter counts from 000 up to 111 and wraps back to 000 cleanly."
                }
            },
            {
                title: "Module 7: Registers",
                desc: "Shift registers, configurations, and data conversion.",
                duration: "45 Min",
                lessons: [
                    {
                        title: "Lesson 7.1: Shift Register Concepts",
                        content: `
                            <p class="mb-4">Shift Registers consist of chained flip-flops that move binary data from one stage to the next on each clock cycle. They are used to store data, delay signals, and convert data between serial and parallel forms.</p>
                        `
                    },
                    {
                        title: "Lesson 7.2: Serial-In Parallel-Out (SIPO) Registers",
                        content: `
                            <p class="mb-4">A Serial-In Parallel-Out (SIPO) register accepts data bit-by-bit over a single input line, shifting it through the stages on each clock cycle. The outputs of all stages are accessible simultaneously, converting the serial data into a parallel format.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the job of a Shift Register?", options: ["Count pulses", "Shift data bits through chained flip-flops", "Multiply frequency"], ans: 1 },
                        { q: "Which register type converts a single-wire data stream into multiple parallel outputs?", options: ["PISO", "SIPO", "SISO"], ans: 1 },
                        { q: "How many clock cycles are needed to shift 4 bits into a SISO register?", options: ["1", "4", "8"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Build a 4-bit SIPO Shift Register in your simulator.",
                    components: ["Logic simulator workspace"],
                    procedure: [
                        "Connect 4 D Flip-Flops in a chain (Q output to next D input).",
                        "Connect a shared clock line to all flip-flops.",
                        "Verify that data shifts through the chain on each clock pulse."
                    ],
                    expectedOutput: "Data bits shift through the register on each clock cycle, appearing at the parallel outputs."
                }
            },
            {
                title: "Module 8: Final Assessment",
                desc: "Finite State Machine (FSM) controller design.",
                duration: "60 Min",
                lessons: [
                    {
                        title: "Lesson 8.1: FSM Moore and Mealy Models",
                        content: `
                            <p class="mb-4">A **Finite State Machine (FSM)** is a design model for sequential logic circuits that progress through a set of states. FSMs are divided into two types based on how they generate outputs:</p>
                            <ul class="list-disc pl-4 space-y-1 mb-4">
                                <li><strong>Moore Machine:</strong> Outputs depend only on the current state.</li>
                                <li><strong>Mealy Machine:</strong> Outputs depend on both the current state and the current inputs.</li>
                            </ul>
                        `
                    },
                    {
                        title: "Lesson 8.2: Designing a State Transition Logic",
                        content: `
                            <p class="mb-4">To design an FSM:</p>
                            <ol class="list-decimal pl-4 space-y-1.5 mb-4">
                                <li>Draw a **State Diagram** showing states, inputs, and outputs.</li>
                                <li>Create a **State Table** mapping current states and inputs to next states.</li>
                                <li>Assign binary values to each state.</li>
                                <li>Minimize the transition logic using K-Maps and build the circuit.</li>
                            </ol>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "In which FSM model do outputs depend only on the current state?", options: ["Moore Machine", "Mealy Machine", "Von Neumann Machine"], ans: 0 },
                        { q: "What is the first step in designing a Finite State Machine?", options: ["Draw K-Maps", "Draw a State Diagram", "Assign binary state values"], ans: 1 },
                        { q: "What component stores the current state in an FSM?", options: ["Logic gates", "Flip-Flops", "Decoder"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Build a simple state controller (e.g. sequence detector) in your simulator.",
                    components: ["Logic simulator workspace"],
                    procedure: [
                        "Create state transition logic based on your state table.",
                        "Connect flip-flops to store the state values.",
                        "Verify that the circuit transitions states correctly in response to inputs."
                    ],
                    expectedOutput: "The FSM transitions states correctly, outputting a detection signal when the target sequence is received."
                }
            }
        ]
    },
    "pcb-design-kicad": {
        category: "Electronics & Communication",
        title: "PCB Design with KiCad",
        desc: "Learn schematic design, PCB routing, and manufacturing preparation.",
        difficulty: "Intermediate",
        duration: "7 Hours",
        lessons: 15,
        whatYouWillLearn: [
            "KiCad workflow and schematic capture interface",
            "Creating schematic symbols and running ERC checks",
            "Designing custom footprints and mapping component pads",
            "PCB board outline creation and layer stackups",
            "Component placement strategies and power routing rules",
            "Multi-layer trace routing and via configurations",
            "Running DRC rules and exporting Gerber files for manufacturing"
        ],
        skillsGained: [
            "Schematic Capture",
            "Footprint Library Design",
            "Multi-layer PCB Routing",
            "Gerber Design Verification"
        ],
        careerRelevance: "Essential skills for hardware design engineers, electronics prototyping specialists, and PCB layout designers.",
        toolsRequired: "KiCad PCB design software suite (version 6.x or newer).",
        prerequisites: [
            "Basic understanding of electronic components (resistors, ICs)",
            "Familiarity with standard schematic diagrams"
        ],
        certDetail: {
            available: "Yes",
            assessment: "Practical Assessment Required",
            verification: "Supported (Database verification)",
            idPrefix: "TL-2026-00004"
        },
        modules: [
            {
                title: "Module 1: KiCad Introduction",
                desc: "PCB design workflow and KiCad interface overview.",
                duration: "40 Min",
                lessons: [
                    {
                        title: "Lesson 1.1: The PCB Design Flow",
                        content: `
                            <p class="mb-4">Designing a printed circuit board (PCB) follows a standard workflow:</p>
                            <ol class="list-decimal pl-4 space-y-1.5 mb-4">
                                <li><strong>Schematic Capture:</strong> Draw the electrical circuit diagram.</li>
                                <li><strong>Footprint Association:</strong> Link each component in the schematic to its physical footprint package.</li>
                                <li><strong>PCB Layout:</strong> Position components and route copper traces on the board.</li>
                                <li><strong>Design Rule Check (DRC):</strong> Verify that the layout complies with manufacturing constraints.</li>
                                <li><strong>Gerber Export:</strong> Generate standard manufacturing files.</li>
                            </ol>
                        `
                    },
                    {
                        title: "Lesson 1.2: Exploring the KiCad Interface",
                        content: `
                            <p class="mb-4">KiCad is a free, open-source software suite for PCB design. Key utilities include:</p>
                            <ul class="list-disc pl-4 space-y-1">
                                <li><strong>Schematic Editor:</strong> For drawing the circuit diagram.</li>
                                <li><strong>Symbol Editor:</strong> For creating custom schematic symbols.</li>
                                <li><strong>PCB Editor:</strong> For component placement and routing.</li>
                                <li><strong>Footprint Editor:</strong> For designing custom component packages.</li>
                            </ul>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the first step in the PCB design workflow?", options: ["Gerber Export", "PCB Layout", "Schematic Capture"], ans: 2 },
                        { q: "Is KiCad proprietary or open-source software?", options: ["Proprietary", "Open-source", "Shareware"], ans: 1 },
                        { q: "Which utility in KiCad is used to design custom component packages?", options: ["Schematic Editor", "Footprint Editor", "Gerber Viewer"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Install KiCad, configure default grid settings, and create a new project workspace.",
                    components: ["KiCad Software Suite installed"],
                    procedure: [
                        "Launch KiCad and create a new project named 'thrulabs_blinker'.",
                        "Open the Schematic Editor and verify default grid settings.",
                        "Save the project files."
                    ],
                    expectedOutput: "The project workspace is created successfully, with schematic and layout files initialized."
                }
            },
            {
                title: "Module 2: Schematic Design",
                desc: "Placing symbols, routing net buses, and ERC checks.",
                duration: "45 Min",
                lessons: [
                    {
                        title: "Lesson 2.1: Placing Symbols and Power Pins",
                        content: `
                            <p class="mb-4">In the Schematic Editor, you place components by searching for their symbols in the library. Connect components using the **Wire** tool. Use power symbols (VCC, GND) to establish power connections without cluttering the schematic with wires.</p>
                        `
                    },
                    {
                        title: "Lesson 2.2: Electrical Rules Check (ERC)",
                        content: `
                            <p class="mb-4">Before transferring your design to the PCB layout, run the **Electrical Rules Check (ERC)**. The ERC verifies that your schematic does not contain logical errors, such as unconnected inputs, shorted power lines, or missing pin definitions.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What tool checks for logical errors in your schematic?", options: ["DRC (Design Rule Check)", "ERC (Electrical Rules Check)", "BOM Compiler"], ans: 1 },
                        { q: "How do you connect component pins in the Schematic Editor?", options: ["Place net labels", "Draw wires using the Wire tool", "Use vias"], ans: 1 },
                        { q: "What is the purpose of power symbols in a schematic?", options: ["To regulate voltage", "To establish power connections cleanly without cluttering the diagram with wires", "To define trace width"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Draw a simple LED blinker circuit schematic containing a resistor, LED, and power connector.",
                    components: ["KiCad Schematic Editor"],
                    procedure: [
                        "Place component symbols: resistor, LED, and power connector.",
                        "Connect the components in series using the Wire tool.",
                        "Run the ERC and resolve any warnings or errors."
                    ],
                    expectedOutput: "The schematic is successfully drawn and passes the ERC check without errors."
                }
            },
            {
                title: "Module 3: Component Libraries",
                desc: "Creating custom schematic symbols and footprint associations.",
                duration: "45 Min",
                lessons: [
                    {
                        title: "Lesson 3.1: Creating Custom Symbols",
                        content: `
                            <p class="mb-4">When using a component that is not in the default libraries, you must design a custom symbol. Define the component's outline and place pins, assigning each pin its correct name, number, and electrical type (Input, Output, Power, Passive, etc.).</p>
                        `
                    },
                    {
                        title: "Lesson 3.2: Footprint Association",
                        content: `
                            <p class="mb-4">Each schematic symbol must be associated with a physical footprint package (SMD or Through-hole) that defines the physical size and spacing of the component's solder pads on the PCB.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Why must pins be assigned an electrical type in custom symbols?", options: ["To set trace width", "To allow the ERC to verify connections", "To set voltage limits"], ans: 1 },
                        { q: "What does a component footprint define?", options: ["Electrical properties", "Physical shape, size, and pad spacing of the component on the board", "Trace routing paths"], ans: 1 },
                        { q: "Which tool associates footprints with schematic symbols?", options: ["Footprint Editor", "Assign Footprints Tool", "DRC"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Associate footprints for the resistor, LED, and connector symbols in your blinker schematic.",
                    components: ["KiCad Assign Footprints Tool"],
                    procedure: [
                        "Open the Assign Footprints tool in your schematic editor.",
                        "Select and map suitable footprints to each component symbol (e.g. 0805 SMD package for the resistor).",
                        "Save the footprint associations."
                    ],
                    expectedOutput: "Footprints are successfully associated with all symbols, preparing the design for PCB layout."
                }
            },
            {
                title: "Module 4: PCB Layout",
                desc: "Importing schematics, defining board outline, and component placement.",
                duration: "55 Min",
                lessons: [
                    {
                        title: "Lesson 4.1: Transferring the Design to PCB Editor",
                        content: `
                            <p class="mb-4">With footprints associated, you transfer your design to the PCB Editor. The footprints will appear connected by thin lines, called the **Ratsnest**, which represent the electrical connections defined in your schematic.</p>
                        `
                    },
                    {
                        title: "Lesson 4.2: Component Placement Strategies",
                        content: `
                            <p class="mb-4">Component placement is a critical step in PCB layout, directly affecting signal integrity and manufacturability. Key strategies:</p>
                            <ul class="list-disc pl-4 space-y-1">
                                <li>Place connectors near the board edges.</li>
                                <li>Place decoupling capacitors close to IC power pins to minimize noise loops.</li>
                                <li>Group related components together to keep routing paths short.</li>
                            </ul>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What do the thin lines in the Ratsnest represent?", options: ["Completed copper traces", "Unrouted electrical connections from the schematic", "Board outlines"], ans: 1 },
                        { q: "Where should decoupling capacitors be placed in your layout?", options: ["At the board edge", "As close as possible to the IC power pins", "Near the connector"], ans: 1 },
                        { q: "On what layer is the physical board outline defined?", options: ["F.Cu (Front Copper)", "Edge.Cuts", "B.Silkscreen"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Import your blinker design into the PCB Editor, define a board outline, and place the components.",
                    components: ["KiCad PCB Editor"],
                    procedure: [
                        "Open the PCB Editor and click 'Update PCB from Schematic'.",
                        "Draw a rectangular board outline on the 'Edge.Cuts' layer.",
                        "Position components inside the board outline following placement guidelines."
                    ],
                    expectedOutput: "Components are placed logically within the defined board outline, ready for routing."
                }
            },
            {
                title: "Module 5: Routing",
                desc: "Trace routing, layer configurations, and ground planes.",
                duration: "55 Min",
                lessons: [
                    {
                        title: "Lesson 5.1: Trace Width and Current carrying capacity",
                        content: `
                            <p class="mb-4">You route signals by drawing copper traces to connect the pads. Choose trace widths based on the current load. Power traces must be wider than signal traces to prevent overheating, calculated using IPC standards.</p>
                        `
                    },
                    {
                        title: "Lesson 5.2: Ground Planes and Via Stitching",
                        content: `
                            <p class="mb-4">In multi-layer boards, use solid copper pours for ground planes. This provides low-impedance paths for return currents and helps shield against electromagnetic interference. Connect different ground layers using vias, a process called **Via Stitching**.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Why are power traces made wider than signal traces?", options: ["To reduce signal noise", "To handle higher current load and prevent overheating", "To make them easier to solder"], ans: 1 },
                        { q: "What is via stitching?", options: ["Soldering wires to the board", "Connecting ground planes on different layers using multiple vias", "Drilling holes for connectors"], ans: 1 },
                        { q: "What is a ground plane?", options: ["The bottom edge of the board", "A solid area of copper connected to ground", "A protective coating"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Route the traces for your blinker PCB and create a ground plane on the bottom layer.",
                    components: ["KiCad PCB Editor"],
                    procedure: [
                        "Configure trace width rules (e.g. 0.25mm for signals, 0.5mm for power).",
                        "Route all traces on the top layer (F.Cu).",
                        "Create a solid copper pour zone on the bottom layer (B.Cu) connected to GND."
                    ],
                    expectedOutput: "Traces are routed successfully, and the ground plane is poured with proper clearance."
                }
            },
            {
                title: "Module 6: DRC",
                desc: "Design Rule Check violations and signal spacing clearances.",
                duration: "45 Min",
                lessons: [
                    {
                        title: "Lesson 6.1: Running Design Rule Check (DRC)",
                        content: `
                            <p class="mb-4">Before finalizing your PCB, you must run the **Design Rule Check (DRC)**. The DRC verifies that your layout complies with manufacturing constraints (such as minimum trace width, spacing clearance, and drill hole sizes) defined by your target manufacturer.</p>
                        `
                    },
                    {
                        title: "Lesson 6.2: Resolving DRC Violations",
                        content: `
                            <p class="mb-4">The DRC will generate an error list for any violations, such as traces running too close to pads or overlapping signals. You must resolve all DRC errors before generating manufacturing files.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What does the DRC verify?", options: ["Electrical logic", "That the layout complies with manufacturing constraints", "Component values"], ans: 1 },
                        { q: "What happens if a layout has unresolved DRC errors when sent to a manufacturer?", options: ["The board will be manufactured with errors", "The manufacturer will reject the files or the board may fail", "The IDE automatically fixes them"], ans: 1 },
                        { q: "Which setting defines the minimum allowed distance between traces?", options: ["Trace Width", "Clearance Spacing", "Grid Size"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Run a DRC on your blinker PCB layout and resolve any errors.",
                    components: ["KiCad DRC Tool"],
                    procedure: [
                        "Open the DRC tool in the PCB Editor.",
                        "Click 'Run DRC' and analyze the error list.",
                        "Adjust traces or components to resolve all reported violations."
                    ],
                    expectedOutput: "The PCB layout passes the DRC check with zero errors or warnings."
                }
            },
            {
                title: "Module 7: Gerber Generation",
                desc: "Exporting Gerber fabrication files and manufacturing preparation.",
                duration: "60 Min",
                lessons: [
                    {
                        title: "Lesson 7.1: Gerber Files and Drill Files",
                        content: `
                            <p class="mb-4">Manufacturers require standard files to fabricate your PCB. **Gerber Files** define the copper layout, solder mask, and silkscreen text for each layer. **Excellon Drill Files** specify the sizes and coordinates of all holes and vias.</p>
                        `
                    },
                    {
                        title: "Lesson 7.2: Verifying Gerber Output",
                        content: `
                            <p class="mb-4">Before sending your files to a manufacturer, use a **Gerber Viewer** utility to inspect the exported files. This helps identify issues (such as offset layers or missing text) that may not show in the PCB editor.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What standard file format is used to share PCB layer layouts with manufacturers?", options: ["PDF", "Gerber Files", "STEP Files"], ans: 1 },
                        { q: "Which file specifies the coordinates and sizes of all holes on the PCB?", options: ["Silkscreen Gerber", "Excellon Drill File", "Netlist File"], ans: 1 },
                        { q: "Why should you use a Gerber Viewer before manufacturing?", options: ["To edit trace paths", "To inspect the exported files for issues not visible in the editor", "To convert file formats"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Generate Gerber and drill files for your blinker PCB.",
                    components: ["KiCad Plot Utility"],
                    procedure: [
                        "Open the 'Plot' utility and configure Gerber output directories.",
                        "Select target layers (Cu, Mask, Silk, Edge.Cuts) and click 'Plot'.",
                        "Generate drill files and check the outputs in the Gerber Viewer."
                    ],
                    expectedOutput: "The Gerber and drill files are generated successfully, passing visual inspection in the Gerber Viewer."
                }
            }
        ]
    },
    "uav-drone-technology": {
        category: "UAV & Drone Technology",
        title: "UAV & Drone Technology",
        desc: "Learn drone systems, flight controllers, propulsion systems, and mission planning.",
        difficulty: "Intermediate",
        duration: "10 Hours",
        lessons: 22,
        whatYouWillLearn: [
            "Quadcopter aerodynamics, dynamics, and thrust metrics",
            "Brushless DC outrunners and ESC timing configurations",
            "Flight controller architectures and MEMS sensor integration",
            "PID feedback loops and stabilization configurations",
            "Receiver setups, SBUS/IBUS, and telemetry networks",
            "GPS coordinate integration and compass calibrations",
            "Waypoint planning and autonomous missions on QGroundControl",
            "Pre-flight safety checklists and FAA airspace rules",
            "Quadcopter frame assembly, power rails, and wiring"
        ],
        skillsGained: [
            "Aerodynamics Physics",
            "PID Loop Tuning",
            "Autonomous Mission Design",
            "Multirotor Assembly"
        ],
        careerRelevance: "Essential skills for drone systems engineers, UAV operators, robotics flight control programmers, and aerospace technicians.",
        toolsRequired: "F450 Quadcopter frame parts (or simulation setup), flight controller (STM32 based), ESCs, brushless motors, QGroundControl software tool.",
        prerequisites: [
            "High school physics and algebra",
            "Basic knowledge of C/C++ or programming structures"
        ],
        certDetail: {
            available: "Yes",
            assessment: "Practical Assessment Required",
            verification: "Supported (Database verification)",
            idPrefix: "TL-2026-00005"
        },
        modules: [
            {
                title: "Module 1: Drone Basics",
                desc: "Multirotor configurations, terminology, and coordinate systems.",
                duration: "40 Min",
                lessons: [
                    {
                        title: "Lesson 1.1: Quadcopter Dynamics",
                        content: `
                            <p class="mb-4">Quadcopters use four independent rotors to generate lift and control orientation. Movement is achieved by varying the speed of individual motors:</p>
                            <ul class="list-disc pl-4 space-y-1 mb-4">
                                <li><strong>Pitch:</strong> Tilt forward or backward, controlled by varying front vs rear motor speeds.</li>
                                <li><strong>Roll:</strong> Tilt left or right, controlled by varying left vs right motor speeds.</li>
                                <li><strong>Yaw:</strong> Rotate clockwise or counterclockwise, controlled by varying opposing diagonal motor pairs.</li>
                            </ul>
                        `
                    },
                    {
                        title: "Lesson 1.2: Motor Rotation Directions",
                        content: `
                            <p class="mb-4">To balance torque and allow yaw control, diagonal motor pairs rotate in opposite directions (clockwise and counterclockwise). Propellers must be matched to the motor rotation direction (CW or CCW).</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which rotational movement turns the drone left or right?", options: ["Pitch", "Roll", "Yaw"], ans: 2 },
                        { q: "How does a quadcopter control yaw orientation?", options: ["Varying speeds of diagonal motor pairs", "Varying front vs rear motor speeds", "Tilting the rotor shafts"], ans: 0 },
                        { q: "Why do diagonal motor pairs rotate in opposite directions?", options: ["To save battery", "To cancel out engine torque", "To fly faster"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Configure a quadcopter layout profile in your flight controller software.",
                    components: ["Flight Controller", "Configuration Software"],
                    procedure: [
                        "Connect the flight controller to your computer.",
                        "Open the configuration utility and select 'Quad X' layout.",
                        "Verify correct motor numbering and rotation direction assignments."
                    ],
                    expectedOutput: "The layout profile is saved successfully, showing correct motor and propeller mappings."
                }
            },
            {
                title: "Module 2: Aerodynamics",
                desc: "Multirotor lift, drag, and thrust-to-weight ratios.",
                duration: "45 Min",
                lessons: [
                    {
                        title: "Lesson 2.1: The Physics of Lift",
                        content: `
                            <p class="mb-4">Propellers generate lift by displacing air downwards, creating a pressure difference (lift force) according to Bernoulli's principle and Newton's third law.</p>
                            <p class="mb-4">The drone's total thrust-to-weight ratio determines its flight performance:</p>
                            <ul class="list-disc pl-4 space-y-1">
                                <li>Ratio of 1:1: The drone can hover, but cannot accelerate or climb.</li>
                                <li>Ratio of 2:1: Standard for stable multirotor flight and basic maneuvers.</li>
                                <li>Ratio of 5:1 or higher: Used in racing drones for fast acceleration.</li>
                            </ul>
                        `
                    },
                    {
                        title: "Lesson 2.2: Propeller Pitch and Motor Load",
                        content: `
                            <p class="mb-4">Propellers are defined by their diameter and pitch (e.g. 1045 represents a 10-inch diameter and 4.5-inch pitch). Pitch is the distance a propeller moves forward in one rotation through ideal fluid. Higher pitch increases speed but requires more motor torque and power.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the recommended thrust-to-weight ratio for a standard multirotor drone?", options: ["1:1", "2:1", "5:1"], ans: 1 },
                        { q: "What does the first two digits in a propeller code (e.g. 1045) represent?", options: ["Pitch", "Diameter in inches", "Weight"], ans: 1 },
                        { q: "How does increasing propeller pitch affect power consumption?", options: ["It decreases current draw", "It has no effect", "It increases current draw and requires more torque"], ans: 2 }
                    ]
                },
                project: {
                    objective: "Calculate the total required hover thrust and select motors for an F450 drone frame.",
                    components: ["Calculator", "Component datasheets"],
                    procedure: [
                        "Estimate the total weight of the drone (e.g. 1200g).",
                        "Calculate the target total thrust for a 2:1 ratio (2400g).",
                        "Divide by 4 to determine the required thrust per motor (600g) at 50% throttle, and select matching motors from datasheets."
                    ],
                    expectedOutput: "Select motors that supply at least 600g of thrust at 50% throttle with your target propellers."
                }
            },
            {
                title: "Module 3: Flight Controllers",
                desc: "Processor architectures and sensor calibration.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 3.1: Flight Controller Hardware",
                        content: `
                            <p class="mb-4">The Flight Controller (FC) is the brain of the drone, containing a microcontroller (typically a 32-bit STM32) and MEMS sensors:</p>
                            <ul class="list-disc pl-4 space-y-1">
                                <li><strong>Gyroscope:</strong> Measures angular velocity (rotation speed) on three axes.</li>
                                <li><strong>Accelerometer:</strong> Measures acceleration forces and gravity to determine pitch and roll angles.</li>
                                <li><strong>Barometer:</strong> Measures air pressure to determine altitude changes.</li>
                            </ul>
                        `
                    },
                    {
                        title: "Lesson 3.2: Sensor Calibration",
                        content: `
                            <p class="mb-4">Sensors have small offsets and drift over time. You must calibrate the accelerometer and gyroscope on a level surface before flight to establish the drone's baseline orientation.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which sensor measures angular rotation rates?", options: ["Accelerometer", "Gyroscope", "Barometer"], ans: 1 },
                        { q: "What does the accelerometer measure to determine tilt angles?", options: ["Air pressure", "Gravity and acceleration forces", "Magnetic field lines"], ans: 1 },
                        { q: "Why must sensors be calibrated before flight?", options: ["To enable Wi-Fi", "To correct for offsets and drift", "To increase motor speed"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Perform accelerometer and gyroscope calibration on your flight controller.",
                    components: ["Flight Controller connected to PC"],
                    procedure: [
                        "Place the flight controller flat on a level surface.",
                        "Launch your configuration software and click 'Calibrate Accelerometer'.",
                        "Hold the board in the indicated positions to complete the calibration process."
                    ],
                    expectedOutput: "The software reports successful calibration, and the 3D model orientation matches the physical board."
                }
            },
            {
                title: "Module 4: ESCs",
                desc: "Electronic Speed Controllers, protocols, and timing.",
                duration: "45 Min",
                lessons: [
                    {
                        title: "Lesson 4.1: The Job of Electronic Speed Controllers (ESCs)",
                        content: `
                            <p class="mb-4">ESCs convert DC power from the battery into 3-phase AC power to drive brushless motors, controlling speed based on signals from the flight controller. ESCs use feedback from the motor (back EMF) to coordinate the phase transitions.</p>
                        `
                    },
                    {
                        title: "Lesson 4.2: Digital Communication Protocols",
                        content: `
                            <p class="mb-4">Modern ESCs communicate with the flight controller using fast digital protocols, such as **DShot**, which send speed values as digital packets rather than variable pulse widths (PWM), reducing latency and electrical noise.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What type of power does an ESC supply to a brushless motor?", options: ["DC Power", "3-phase AC Power", "Single-phase pulse"], ans: 1 },
                        { q: "Which protocol is a digital communication standard between the FC and ESC?", options: ["DShot", "SPI", "UART"], ans: 0 },
                        { q: "What does the ESC monitor to coordinate motor phase transitions?", options: ["Internal temperature", "Back EMF feedback from the motor", "Throttle value"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Configure DShot digital protocol for your ESCs in the flight controller configuration software.",
                    components: ["Flight Controller", "ESCs"],
                    procedure: [
                        "Connect the flight controller to your PC.",
                        "Open the configuration utility and select 'DSHOT600' as the motor protocol.",
                        "Save the settings and verify ESC communication."
                    ],
                    expectedOutput: "ESCs respond correctly to digital speed commands, indicating successful protocol configuration."
                }
            },
            {
                title: "Module 5: Motors",
                desc: "Brushless motors, KV ratings, and wiring.",
                duration: "45 Min",
                lessons: [
                    {
                        title: "Lesson 5.1: Brushless DC Outrunner Motors",
                        content: `
                            <p class="mb-4">multirotors use brushless DC outrunner motors. In an outrunner motor, the outer bell containing permanent magnets rotates around a central stator of wire coils. This design provides higher torque at lower speeds compared to inrunner designs, allowing direct drive of propellers without gearing.</p>
                        `
                    },
                    {
                        title: "Lesson 5.2: Understanding the KV Rating",
                        content: `
                            <p class="mb-4">The KV rating indicates the motor's RPM per volt of input under no-load conditions (e.g. a 920KV motor rotates at 920 RPM per Volt). Lower KV motors spin larger propellers and run on higher voltages (like 4S batteries), while higher KV motors spin smaller propellers at high speed on lower voltages.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What does the KV rating of a brushless motor indicate?", options: ["Kilovolts", "RPM per Volt of input under no load", "Maximum current capacity"], ans: 1 },
                        { q: "Which motor type is standard for direct drive propellers on multirotors?", options: ["Inrunner brushless motor", "Outrunner brushless motor", "Brushed coreless motor"], ans: 1 },
                        { q: "What happens if you swap any two of the three phase wires between an ESC and a motor?", options: ["The motor is damaged", "The motor rotation direction is reversed", "The motor runs faster"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Connect a brushless motor to an ESC and verify its rotation direction.",
                    components: ["Brushless motor", "ESC", "Flight Controller", "Battery"],
                    procedure: [
                        "Connect the three motor phase wires to the ESC outputs.",
                        "Use the motor test utility in the configuration software to spin the motor at low speed.",
                        "If the motor rotates in the wrong direction, swap any two of the three phase wires."
                    ],
                    expectedOutput: "The motor rotates in the correct direction (CW or CCW) matching its position on the frame layout."
                }
            },
            {
                title: "Module 6: Batteries",
                desc: "LiPo chemistry, C-ratings, and safety guidelines.",
                duration: "45 Min",
                lessons: [
                    {
                        title: "Lesson 6.1: Lithium Polymer (LiPo) Batteries",
                        content: `
                            <p class="mb-4">Drones use Lithium Polymer (LiPo) batteries because they offer high energy density and high discharge rates. A single LiPo cell has a nominal voltage of 3.7V (fully charged at 4.2V). Batteries are defined by their cell count (e.g., 3S represents 3 cells in series, yielding 11.1V nominal).</p>
                        `
                    },
                    {
                        title: "Lesson 6.2: Understanding C-Rating and Safe Discharging",
                        content: `
                            <p class="mb-4">The **C-Rating** defines the battery's maximum safe discharge current relative to its capacity (e.g. a 1500mAh 75C battery can supply up to $1.5A \times 75 = 112.5A$ of continuous current).</p>
                            <p class="mb-4">To prevent battery damage or fires:</p>
                            <ul class="list-disc pl-4 space-y-1">
                                <li>Never discharge cells below 3.0V (3.3V is a safe storage limit).</li>
                                <li>Never charge cells above 4.2V.</li>
                                <li>Use balance chargers to keep cell voltages equal.</li>
                            </ul>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the nominal voltage rating of a single LiPo cell?", options: ["1.2V", "3.7V", "4.2V"], ans: 1 },
                        { q: "What is the maximum safe discharge current of a 2000mAh (2.0Ah) 50C battery?", options: ["50 A", "100 A", "10 A"], ans: 1 },
                        { q: "What is the safe minimum discharge voltage limit for a LiPo cell?", options: ["3.0V (3.3V recommended)", "0V", "1.5V"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Configure a low-voltage battery telemetry warning on your flight controller.",
                    components: ["Flight Controller", "Battery voltage sensor"],
                    procedure: [
                        "Connect battery voltage monitoring leads to the flight controller sensor pins.",
                        "Set warning threshold voltage (e.g., 3.5V per cell) in your configuration utility.",
                        "Verify that the warning indicator triggers when battery voltage drops below the threshold."
                    ],
                    expectedOutput: "The flight controller outputs a low-voltage alarm (via buzzer or telemetry) when the threshold is crossed."
                }
            },
            {
                title: "Module 7: Mission Planning",
                desc: "GPS integration, coordinate systems, and waypoint planning on QGroundControl.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 7.1: GPS Integration and Navigation Modes",
                        content: `
                            <p class="mb-4">Autonomous navigation requires a GPS module to determine coordinate position (latitude, longitude, altitude) and a magnetometer (compass) to determine heading direction. These sensors allow the flight controller to implement navigation modes like position hold and return-to-home.</p>
                        `
                    },
                    {
                        title: "Lesson 7.2: Designing Waypoint Missions",
                        content: `
                            <p class="mb-4">Using ground control station software (like QGroundControl), you can design autonomous flight paths by placing **Waypoints** on a map. For each waypoint, configure parameters like altitude, speed, and hold time. The mission plan is uploaded to the flight controller before take-off.</p>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which sensor determines the drone's heading direction?", options: ["GPS", "Magnetometer (Compass)", "Barometer"], ans: 1 },
                        { q: "What ground control software is commonly used for UAV mission planning?", options: ["QGroundControl", "Logisim", "Keil IDE"], ans: 0 },
                        { q: "What is a waypoint?", options: ["A motor calibration step", "A coordinate point in an autonomous flight path", "A communication protocol"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Design a 3-waypoint survey mission in QGroundControl and verify the flight path.",
                    components: ["QGroundControl software tool"],
                    procedure: [
                        "Open QGroundControl and select 'Plan' mode.",
                        "Place three waypoints on the map in a triangular pattern.",
                        "Configure waypoint altitudes to 20 meters and save the mission file."
                    ],
                    expectedOutput: "The mission plan shows a valid flight path, with waypoint coordinates and altitudes configured."
                }
            },
            {
                title: "Module 8: Safety",
                desc: "Pre-flight checklists, failsafes, and aviation regulations.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 8.1: Failsafe Configurations",
                        content: `
                            <p class="mb-4">A **Failsafe** is an automated safety routine that triggers when the drone loses its radio control link or battery levels drop too low. Common failsafe routines include:</p>
                            <ul class="list-disc pl-4 space-y-1 mb-4">
                                <li><strong>Return-to-Land (RTL):</strong> The drone climbs to a safe altitude, flies back to its take-off coordinate, and lands autonomously.</li>
                                <li><strong>Land-in-Place:</strong> The drone immediately lands in its current position.</li>
                            </ul>
                        `
                    },
                    {
                        title: "Lesson 8.2: Airspace Rules & Regulations",
                        content: `
                            <p class="mb-4">Operators must comply with local aviation authority rules (such as FAA Part 107 in the US). Key rules:</p>
                            <ul class="list-disc pl-4 space-y-1">
                                <li>Keep the drone within Visual Line of Sight (VLOS) at all times.</li>
                                <li>Do not fly higher than 400 feet (120 meters) above ground level.</li>
                                <li>Do not fly near airports or in restricted airspace.</li>
                            </ul>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the maximum allowed altitude for drone flight under standard rules?", options: ["400 feet (120 meters)", "1000 feet", "No limit"], ans: 0 },
                        { q: "What failsafe routine flies the drone back to its take-off location?", options: ["Land-in-Place", "Return-to-Land (RTL)", "Hold Position"], ans: 1 },
                        { q: "What does the VLOS abbreviation require?", options: ["Visual Line of Sight", "Voltage Level Output Sensor", "Vector Loop Orientation Setup"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Configure a Loss-of-Signal (RTL) failsafe trigger on your flight controller.",
                    components: ["Flight Controller connected to PC"],
                    procedure: [
                        "Access the Failsafe configuration tab in your configuration software.",
                        "Set the trigger delay (e.g. 1.0 second) and select 'Return-to-Land' as the failsafe action.",
                        "Verify failsafe settings."
                    ],
                    expectedOutput: "The flight controller triggers the RTL routine when the radio signal is lost."
                }
            },
            {
                title: "Module 9: Drone Assembly",
                desc: "Framing, soldering, and final verification tests.",
                duration: "60 Min",
                lessons: [
                    {
                        title: "Lesson 9.1: Soldering a Power Distribution Board",
                        content: `
                            <p class="mb-4">Building a quadcopter begins by assembling the structural frame and soldering the electronics. Multi-rotor frames often integrate a **Power Distribution Board (PDB)** into the bottom plate. The ESC power leads and main battery connector are soldered directly to the PDB rails, which distribute high current from the battery to each ESC.</p>
                        `
                    },
                    {
                        title: "Lesson 9.2: Complete UAV Calibration and Setup Checklist",
                        content: `
                            <p class="mb-4">Before your first test flight, follow this calibration checklist:</p>
                            <ol class="list-decimal pl-4 space-y-1.5 mb-4">
                                <li>Verify correct motor rotation directions and propeller direction matches (CW/CCW).</li>
                                <li>Calibrate the accelerometer, gyroscope, and compass.</li>
                                <li>Calibrate ESC throttle ranges.</li>
                                <li>Set up radio transmitter channel endpoints.</li>
                                <li>Test the failsafe triggers on the bench (with propellers removed).</li>
                            </ol>
                        `
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which component distributes battery power to each ESC on the frame?", options: ["Flight Controller", "Power Distribution Board (PDB)", "Receiver"], ans: 1 },
                        { q: "What should always be removed when performing bench tests of motors?", options: ["USB Cable", "Propellers", "Telemetry Module"], ans: 1 },
                        { q: "Why must ESC throttle ranges be calibrated?", options: ["To match the flight controller's throttle output endpoints", "To increase maximum RPM", "To change rotation direction"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Perform final verification checks on your quadcopter assembly.",
                    components: ["Assembled Quadcopter (without propellers)", "Battery", "Radio Transmitter"],
                    procedure: [
                        "Mount the flight controller at the center of the frame.",
                        "Verify that all motor rotation directions match the layout diagram.",
                        "Verify that the failsafe triggers correctly when the radio transmitter is turned off."
                    ],
                    expectedOutput: "The drone passes all checks, and the flight controller triggers failsafes when the transmitter is turned off."
            }
        ]
    },
    "communication-systems-basics": {
        category: "Electronics & Communication",
        title: "Communication Systems Basics",
        desc: "Introduction to signal modulation, noise reduction, and analog/digital transmission standards.",
        difficulty: "Beginner",
        duration: "6 Hours",
        lessons: 15,
        whatYouWillLearn: [
            "Introduction to signals, amplitude and frequency",
            "Analog modulation techniques (AM/FM)",
            "Digital modulation and signal coding",
            "Understanding noise margins and signal filters"
        ],
        skillsGained: [
            "Signal Analysis",
            "Modulation Principles",
            "Noise Filtering"
        ],
        careerRelevance: "Essential for RF engineers, communications technicians, and telecommunications product designers.",
        toolsRequired: "SDR receiver, signal generator, soundcard analyzer tools.",
        prerequisites: [
            "Basic algebra",
            "High school physics foundations"
        ],
        certDetail: {
            available: "No",
            assessment: "Practical Exercises",
            verification: "Not Available",
            idPrefix: "TL-2026-NOCERT"
        },
        modules: [
            {
                title: "Module 1: Introduction to Modulation",
                desc: "Basics of modulation, carrier frequencies, and transmission channels.",
                duration: "45 Min",
                lessons: [
                    {
                        title: "Lesson 1.1: What is Modulation?",
                        content: `<p class="mb-4">Modulation is the process of varying one or more properties of a high-frequency periodic waveform, called the carrier signal, with a modulating signal that contains information to be transmitted.</p>
                        <p class="mb-4">By superimposing the message signal on a higher frequency carrier, we can transmit data over long distances using reasonable antenna sizes, and multiplex multiple signals over the same channel without overlap.</p>`
                    },
                    {
                        title: "Lesson 1.2: Carrier Waves and Channels",
                        content: `<p class="mb-4">The carrier signal is generally a high-frequency sine wave represented as:</p>
                        <div class="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 font-mono text-[10px] text-center">
                            c(t) = Ac * sin(2 * pi * fc * t)
                        </div>
                        <p class="mb-4">Transmission channels can be guided (like coaxial cables or optical fibers) or unguided (like wireless radio frequency bands). Each channel has unique attenuation and frequency response properties.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the signal that contains information called?", options: ["Carrier Signal", "Modulating Signal", "Noise Signal"], ans: 1 },
                        { q: "Which signal characteristics can be modified during modulation?", options: ["Amplitude, Frequency, or Phase", "Only Amplitude", "Only Frequency"], ans: 0 },
                        { q: "Why is high-frequency carrier modulation necessary for wireless transmission?", options: ["It decreases signal speed", "It keeps required antenna dimensions practical", "It removes the need for amplifiers"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Simulate a basic AM modulator in an online tool.",
                    components: ["Computer"],
                    procedure: ["Open simulation tool.", "Set carrier to 10kHz and signal to 500Hz.", "Verify modulated output wave envelopes."],
                    expectedOutput: "An AM modulated wave pattern showing signal envelope matching the modulating wave."
                }
            },
            {
                title: "Module 2: Amplitude & Frequency Modulation",
                desc: "Understanding AM/FM transmitter and receiver circuit designs and modulation indexes.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 2.1: Amplitude Modulation (AM)",
                        content: `<p class="mb-4">In Amplitude Modulation, the instantaneous amplitude of the carrier wave is varied in linear proportion to the message signal's voltage.</p>
                        <p class="mb-4">We define the modulation index <code>m</code> as:</p>
                        <div class="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 font-mono text-[10px] text-center">
                            m = Am / Ac
                        </div>
                        <p class="mb-4">If <code>m &gt; 1</code>, overmodulation occurs. This distorts the signal envelope, making demodulation via simple diode peak detectors impossible without severe audio cracking.</p>`
                    },
                    {
                        title: "Lesson 2.2: Frequency Modulation (FM)",
                        content: `<p class="mb-4">Frequency Modulation varies the instantaneous frequency of the carrier signal in proportion to the modulating signal's voltage amplitude, while keeping the carrier's amplitude constant.</p>
                        <p class="mb-4">Since electrical noise mostly affects a signal's amplitude, FM is highly immune to noise compared to AM. However, FM requires significantly wider frequency bandwidths to transmit the same audio signal.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What happens if the modulation index (m) is greater than 1 in AM?", options: ["Signal strength doubles", "Overmodulation and envelope distortion", "Bandwidth decreases by half"], ans: 1 },
                        { q: "Which parameter remains completely constant in Frequency Modulation?", options: ["Phase", "Frequency", "Amplitude"], ans: 2 },
                        { q: "What is a major advantage of FM over AM?", options: ["It uses less bandwidth", "It has superior noise immunity", "It requires simpler receiver circuits"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Measure the modulation index of an AM wave using an oscilloscope simulator.",
                    components: ["Virtual signal generator", "Virtual oscilloscope", "AM modulator circuit block"],
                    procedure: ["Set modulating frequency to 1kHz.", "Set carrier frequency to 100kHz.", "Adjust modulating amplitude until peaks are twice the carrier values.", "Calculate the resulting index value."],
                    expectedOutput: "The modulation index is calculated as 0.5 without overmodulation envelope distortion."
                }
            },
            {
                title: "Module 3: Digital Transmission Standards",
                desc: "Exploring ASK, FSK, and PSK shift keying methods alongside Shannon-Nyquist sampling rules.",
                duration: "60 Min",
                lessons: [
                    {
                        title: "Lesson 3.1: Digital Shift Keying (ASK/FSK/PSK)",
                        content: `<p class="mb-4">Digital modulation maps discrete binary logic states (0s and 1s) onto a continuous analog carrier wave. The three primary methods are:</p>
                        <ul class="list-disc pl-4 space-y-1 mb-4">
                            <li><strong>Amplitude Shift Keying (ASK):</strong> Toggles carrier amplitude states (often 0V for binary 0, full voltage for 1).</li>
                            <li><strong>Frequency Shift Keying (FSK):</strong> Switches between two different carrier frequencies.</li>
                            <li><strong>Phase Shift Keying (PSK):</strong> Shifts the starting phase angle of the carrier wave.</li>
                        </ul>`
                    },
                    {
                        title: "Lesson 3.2: The Sampling Theorem",
                        content: `<p class="mb-4">The Nyquist-Shannon Sampling Theorem states that to accurately reconstruct a continuous analog signal in the digital domain, the sampling rate must exceed twice the highest frequency component of the analog signal:</p>
                        <div class="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 font-mono text-[10px] text-center">
                            Fs &gt; 2 * Fmax
                        </div>
                        <p class="mb-4">If <code>Fs</code> is lower, high-frequency components 'alias' into false low-frequency signals, destroying data integrity.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which digital modulation scheme shifts the phase angle of the carrier wave?", options: ["ASK", "FSK", "PSK"], ans: 2 },
                        { q: "According to Nyquist, what is the minimum sampling rate for a 4kHz voice signal?", options: ["4kHz", "8kHz", "16kHz"], ans: 1 },
                        { q: "What phenomenon occurs when sampling below the Nyquist rate?", options: ["Aliasing", "Attenuation", "Modulation index drop"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Demonstrate signal aliasing on a virtual sample-and-hold circuit.",
                    components: ["Signal generator", "Variable clock pulse generator", "Low-pass reconstruction filter"],
                    procedure: ["Feed a 2kHz sine wave into the sampler.", "Adjust clock pulse from 5kHz down to 3kHz.", "Observe the output on the virtual scope."],
                    expectedOutput: "The output waveform gets distorted and shifts to a false lower frequency when clock falls below 4kHz."
                }
            },
            {
                title: "Module 4: Noise Filtering & Signal Integrity",
                desc: "Designing passive high-pass/low-pass noise filters and calculating signal-to-noise ratios (SNR).",
                duration: "60 Min",
                lessons: [
                    {
                        title: "Lesson 4.1: Noise and SNR Calculations",
                        content: `<p class="mb-4">Noise is unwanted random electrical signals that corrupt data. We quantify signal quality using the Signal-to-Noise Ratio (SNR), expressed in decibels (dB):</p>
                        <div class="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 font-mono text-[10px] text-center">
                            SNR (dB) = 10 * log10(P_signal / P_noise)
                        </div>
                        <p class="mb-4">Higher SNR indicates a cleaner channel, which is crucial for achieving high data transmission throughput rates.</p>`
                    },
                    {
                        title: "Lesson 4.2: Filtering Out Noise",
                        content: `<p class="mb-4">Filters block specific frequency bands while letting others pass. An RC low-pass filter passes frequencies below its cutoff frequency:</p>
                        <div class="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 font-mono text-[10px] text-center">
                            fc = 1 / (2 * pi * R * C)
                        </div>
                        <p class="mb-4">Error correction codes (such as Hamming codes) add structured redundant bits to digital packets, enabling detection and correction of transmission corruption on noisy channels.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "How is a filter that blocks low frequencies but passes high frequencies classified?", options: ["Low-Pass Filter", "High-Pass Filter", "Band-Pass Filter"], ans: 1 },
                        { q: "What unit of measure is standard for Signal-to-Noise Ratio (SNR)?", options: ["Hertz (Hz)", "Decibels (dB)", "Ohms"], ans: 1 },
                        { q: "Which coding technique allows fixing transmission bits that flipped due to noise?", options: ["Amplitude shift keying", "Error-Correcting Code (e.g. Hamming Code)", "Frequency sweep coding"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Design a passive RC low-pass filter with a cutoff frequency of 1.6kHz.",
                    components: ["1k Ohm resistor", "100nF capacitor", "Breadboard", "Audio function generator"],
                    procedure: ["Connect the resistor in series with the input signal.", "Place the capacitor in parallel to ground.", "Measure signal attenuation at 500Hz, 1.6kHz, and 5kHz."],
                    expectedOutput: "The filter passes 500Hz signals with minimal loss but attenuates 5kHz signals by more than 10dB."
                }
            }
        ]
    },
    "introduction-to-embedded": {
        category: "Embedded Systems",
        title: "Introduction to Embedded Systems",
        desc: "Basics of microcontrollers, breadboard prototyping, and writing your first firmware logic.",
        difficulty: "Beginner",
        duration: "5 Hours",
        lessons: 12,
        whatYouWillLearn: [
            "Understanding what an embedded system is",
            "Basic components of a microcontroller",
            "Breadboard prototyping and wiring rules",
            "Writing simple code loops in C"
        ],
        skillsGained: [
            "Prototyping Basics",
            "Firmware Logic",
            "Hardware Safety"
        ],
        careerRelevance: "Great introductory skill for hobbyists, entry-level firmware testers, and robotics enthusiasts.",
        toolsRequired: "Arduino Uno board, breadboard, resistors, LEDs.",
        prerequisites: [
            "None"
        ],
        certDetail: {
            available: "No",
            assessment: "Lab Exercises",
            verification: "Not Available",
            idPrefix: "TL-2026-NOCERT"
        },
        modules: [
            {
                title: "Module 1: Getting Started with MCUs",
                desc: "Introduction to chips, boards, and standard input/output components.",
                duration: "40 Min",
                lessons: [
                    {
                        title: "Lesson 1.1: What is an Embedded System?",
                        content: `<p class="mb-4">An embedded system is a microprocessor-based computer hardware system with software that is designed to perform a dedicated function, either as an independent system or as a part of a large system.</p>
                        <p class="mb-4">Unlike standard desktop PCs, embedded systems are highly optimized for specific tasks, operate in real-time, have strict power limits, and interface directly with physical sensors and actuators.</p>`
                    },
                    {
                        title: "Lesson 1.2: Microcontroller Pins and Voltage Rails",
                        content: `<p class="mb-4">Microcontrollers access the outside world through General Purpose Input/Output (GPIO) pins. Pins are mapped in software as either digital inputs (to read switches) or digital outputs (to drive LEDs/relays).</p>
                        <p class="mb-4">Most modern microcontrollers operate on either 5.0V or 3.3V power rails. Connecting a high-voltage sensor directly to a GPIO pin can burn out the silicon ports instantly.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the main brain of an embedded system called?", options: ["Microcontroller / Microprocessor", "SRAM", "Power supply"], ans: 0 },
                        { q: "What does GPIO stand for?", options: ["General Purpose Input/Output", "Global Peripheral Interface Organizer", "Galvanic Port Impedance Operator"], ans: 0 },
                        { q: "What happens if you feed a 12V sensor signal directly into a 3.3V GPIO pin?", options: ["The signal is scaled down automatically", "It will likely destroy the microcontroller port", "It increases system speed"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Identify pins on a microcontroller board.",
                    components: ["MCU Board", "Reference Pinout Sheet"],
                    procedure: ["Examine board layouts.", "Locate digital pin 13, GND, and the 5V power header pins.", "Verify pin assignments against the datasheet board map."],
                    expectedOutput: "Pins correctly identified and mapped on the physical layout sheet."
                }
            },
            {
                title: "Module 2: Breadboard Prototyping",
                desc: "Understanding direct currents, LED routing, series resistors, and tactile button debounce rules.",
                duration: "45 Min",
                lessons: [
                    {
                        title: "Lesson 2.1: Solderless Breadboard Internal Structures",
                        content: `<p class="mb-4">Breadboards allow solderless prototyping. The internal clips are organized in structural patterns:</p>
                        <ul class="list-disc pl-4 space-y-1 mb-4">
                            <li><strong>Power Rails:</strong> Run vertically down the sides to distribute VCC and GND.</li>
                            <li><strong>Terminal Strips:</strong> Run horizontally in groups of 5, separated by a center divider channel.</li>
                        </ul>
                        <p class="mb-4">The center channel matches standard dual-in-line (DIP) IC chip pin spacings, preventing pins on opposite sides from short-circuiting.</p>`
                    },
                    {
                        title: "Lesson 2.2: Debouncing Button Switches",
                        content: `<p class="mb-4">Mechanical switches consist of spring metal contacts. When pressed, the contacts vibrate and bounce physically for several milliseconds, making the MCU read multiple rapid button presses.</p>
                        <p class="mb-4">To solve this, we implement debouncing. This can be done in hardware (using an RC filter) or in software (by adding a brief delay and re-checking the pin state before registering the press).</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "How are the outer columns of a standard breadboard typically wired?", options: ["Vertically as power rails", "Horizontally in groups of 5", "They are not connected at all"], ans: 0 },
                        { q: "Why is a pull-up resistor used with input buttons?", options: ["To limit current to the LED", "To keep the pin in a stable HIGH state when the button is open", "To boost the voltage to 12V"], ans: 1 },
                        { q: "What is the main cause of button bounce?", options: ["Software loop glitches", "Mechanical spring contacts vibrating before settling", "Excessive electrical capacitance"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Build a debounced button circuit to toggle a state indicator LED.",
                    components: ["Microcontroller board", "Tactile switch", "10k Ohm resistor", "LED", "220 Ohm resistor"],
                    procedure: ["Connect a button with a 10k pull-up resistor to digital pin 2.", "Write code to read pin state.", "Add a 20ms delay logic check before toggling pin 13 LED."],
                    expectedOutput: "The LED toggles cleanly on each button press without double-triggering."
                }
            },
            {
                title: "Module 3: Core Architecture & Memory",
                desc: "Exploring bare-metal processor registers, SRAM vs Flash, and standard compiler pipelines.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 3.1: Inside the Microcontroller Core",
                        content: `<p class="mb-4">A microcontroller integrates several core systems onto a single chip:</p>
                        <ul class="list-disc pl-4 space-y-1 mb-4">
                            <li><strong>CPU Core:</strong> Fetches instructions, decodes them, and performs arithmetic.</li>
                            <li><strong>Registers:</strong> Small, ultra-fast memory units inside the CPU used for immediate calculations.</li>
                            <li><strong>Flash Memory:</strong> Non-volatile memory that holds the compiled program instructions permanently.</li>
                            <li><strong>SRAM:</strong> Volatile memory that stores runtime variables and the stack.</li>
                        </ul>`
                    },
                    {
                        title: "Lesson 3.2: Compilation Pipeline",
                        content: `<p class="mb-4">The source code written in C is converted to a binary map that the processor can run. The steps are:</p>
                        <div class="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 font-mono text-[9px]">
                            Source Code (.c) -&gt; Preprocessor -&gt; Compiler (.s) -&gt; Assembler (.o) -&gt; Linker -&gt; Binary (.hex/.bin)
                        </div>
                        <p class="mb-4">The linked output mapping allocates global variables to the SRAM data section and instructions to the Flash program memory.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which MCU memory block is non-volatile and holds the program code?", options: ["Flash Memory", "SRAM", "EEPROM"], ans: 0 },
                        { q: "What does the Program Counter (PC) register store?", options: ["The address of the next instruction to execute", "The values of local variables", "The cumulative number of clock ticks"], ans: 0 },
                        { q: "What role does the linker play in the compilation pipeline?", options: ["It uploads code to the board", "It compiles assembly to machine code", "It combines object files and libraries into a single executable map"], ans: 2 }
                    ]
                },
                project: {
                    objective: "Audit compile sizes of global variables versus local variables.",
                    components: ["Compiler toolchain IDE"],
                    procedure: ["Declare a large static array globally and compile.", "Move the array inside a function locally and compile.", "Note the memory allocation difference in the compiler outputs."],
                    expectedOutput: "Global array allocations permanently increase SRAM usage metrics in the compiler log."
                }
            },
            {
                title: "Module 4: Analog Interfacing & ADC",
                desc: "Interfacing potentiometers and photoresistors, and configuring analog-to-digital converters.",
                duration: "55 Min",
                lessons: [
                    {
                        title: "Lesson 4.1: Analog vs Digital Inputs",
                        content: `<p class="mb-4">While digital inputs only distinguish between HIGH (1) and LOW (0), analog inputs can measure intermediate voltages. To convert these voltages to numbers, the MCU uses an Analog-to-Digital Converter (ADC).</p>
                        <p class="mb-4">Common analog sensors, like potentiometers and photoresistors (LDRs), are configured in voltage divider circuits to output a variable voltage corresponding to physical changes.</p>`
                    },
                    {
                        title: "Lesson 4.2: ADC Resolution and Calculations",
                        content: `<p class="mb-4">ADC resolution determines the precision of digital readings. A 10-bit ADC maps analog input voltages between 0V and Vref to integers from 0 to 1023.</p>
                        <p class="mb-4">The step resolution is calculated as:</p>
                        <div class="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 font-mono text-[10px] text-center">
                            Resolution = Vref / (2^n)
                        </div>
                        <p class="mb-4">For a 10-bit ADC with Vref = 5V, each step is approximately 4.88mV.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What numeric range does a 10-bit ADC return?", options: ["0 to 255", "0 to 1023", "0 to 4095"], ans: 1 },
                        { q: "If Vref is 5.0V, what voltage corresponds to an ADC reading of 512?", options: ["1.25V", "2.5V", "3.3V"], ans: 1 },
                        { q: "Which sensor type relies on a voltage divider circuit to read light levels?", options: ["LDR (Photoresistor)", "Digital temperature probe", "PWM motor shield"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Read variable light intensity using an LDR and light up an alarm if dark.",
                    components: ["LDR sensor", "10k Ohm resistor", "LED", "MCU board", "Jumper wires"],
                    procedure: ["Create a voltage divider with the LDR and 10k resistor.", "Connect middle node to analog pin A0.", "Monitor the integer reading in loop.", "Toggle LED if reading falls below 300."],
                    expectedOutput: "Covering the LDR causes the ADC value to drop below 300, turning on the warning LED."
                }
            }
        ]
    },
    "basic-electronics": {
        category: "Electronics & Communication",
        title: "Basic Electronics",
        desc: "Understand voltage, current, resistance, Ohm's law, and passive components in circuit design.",
        difficulty: "Beginner",
        duration: "8 Hours",
        lessons: 20,
        whatYouWillLearn: [
            "Voltage, current, and resistance principles",
            "Resistors, capacitors, and inductors in series/parallel",
            "Ohm's Law calculations and measurements",
            "How to read electronic circuit schematics"
        ],
        skillsGained: [
            "Circuit Analysis",
            "Multimeter Usage",
            "Schematic Reading"
        ],
        careerRelevance: "Fundamental skills required for all electronic engineers, hardware technicians, and makers.",
        toolsRequired: "Digital Multimeter, breadboard, resistors, battery.",
        prerequisites: [
            "None"
        ],
        certDetail: {
            available: "No",
            assessment: "Practical Lab Tests",
            verification: "Not Available",
            idPrefix: "TL-2026-NOCERT"
        },
        modules: [
            {
                title: "Module 1: Ohm's Law",
                desc: "Calculating voltage, current, and resistance metrics.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 1.1: The Formula V = IR",
                        content: `<p class="mb-4">Ohm's law states that the current through a conductor between two points is directly proportional to the voltage across the two points. The formula is:</p>
                        <div class="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 font-mono text-[10px] text-center">
                            V = I * R
                        </div>
                        <p class="mb-4">Where V is voltage in volts (V), I is current in amperes (A), and R is resistance in ohms (Ω). This equation is the foundation of electrical circuit analysis.</p>`
                    },
                    {
                        title: "Lesson 1.2: Volts, Amperes, and Ohms",
                        content: `<p class="mb-4">To visualize these units, think of a water pipe analogy:</p>
                        <ul class="list-disc pl-4 space-y-1 mb-4">
                            <li><strong>Voltage:</strong> The water pressure pushing the fluid.</li>
                            <li><strong>Current:</strong> The flow rate of water through the pipe.</li>
                            <li><strong>Resistance:</strong> The physical narrowing of the pipe restricting flow.</li>
                        </ul>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "If V = 10V and R = 5 Ohms, what is current I?", options: ["2 Amps", "50 Amps", "0.5 Amps"], ans: 0 },
                        { q: "Which unit measures the flow of electrical charge?", options: ["Volt", "Ohm", "Ampere"], ans: 2 },
                        { q: "What is the equivalent resistance of three 100 Ohm resistors in series?", options: ["33.3 Ohms", "100 Ohms", "300 Ohms"], ans: 2 }
                    ]
                },
                project: {
                    objective: "Verify Ohm's Law using a digital multimeter.",
                    components: ["Resistor", "Battery", "Multimeter"],
                    procedure: ["Measure resistor resistance.", "Measure battery voltage.", "Measure loop current and compare with V/R calculation."],
                    expectedOutput: "Measured current matches calculated current."
                }
            },
            {
                title: "Module 2: Passive Components",
                desc: "Studying series and parallel resistors, capacitors, inductors, and RC filter time constants.",
                duration: "50 Min",
                lessons: [
                    {
                        title: "Lesson 2.1: Capacitors & Inductors",
                        content: `<p class="mb-4">Capacitors store electrical energy in an electrostatic field. They block DC current but let AC pass. Inductors store energy in a magnetic field when current flows through them. They block AC signals but pass DC.</p>
                        <p class="mb-4">Combining capacitors and inductors allows engineering filters, oscillators, and power regulation circuits.</p>`
                    },
                    {
                        title: "Lesson 2.2: RC Time Constants (Tau)",
                        content: `<p class="mb-4">In a circuit containing a resistor (R) and capacitor (C), the charging and discharging rates depend on the time constant <code>tau</code>:</p>
                        <div class="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 font-mono text-[10px] text-center">
                            tau = R * C
                        </div>
                        <p class="mb-4">It takes approximately 5 * tau for a capacitor to charge to 99.3% of the supply voltage.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the unit of measure for capacitance?", options: ["Farad", "Henry", "Ohm"], ans: 0 },
                        { q: "How does a capacitor behave in a steady-state DC circuit?", options: ["Short circuit", "Open circuit", "Resistor of 10 Ohms"], ans: 1 },
                        { q: "What is the time constant of a circuit with a 1k Ohm resistor and a 10uF capacitor?", options: ["1 millisecond", "10 milliseconds", "100 milliseconds"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Build and measure the charge curve of an RC timer circuit.",
                    components: ["100uF capacitor", "10k Ohm resistor", "LED", "5V power source", "Multimeter", "Stopwatch"],
                    procedure: ["Connect resistor and capacitor in series to 5V.", "Connect a voltmeter across the capacitor.", "Measure voltage at 1s, 2s, 3s, and 5s after power-on."],
                    expectedOutput: "Voltmeter reads 3.15V at 1 second (~1 time constant) and approaches 5V by 5 seconds."
                }
            },
            {
                title: "Module 3: Diodes & Transistors",
                desc: "Understanding PN-junction diode rectification and using BJTs/MOSFETs as solid-state switches.",
                duration: "55 Min",
                lessons: [
                    {
                        title: "Lesson 3.1: Diodes & Rectification",
                        content: `<p class="mb-4">Diodes permit current flow in one direction only (forward bias) and block it in the opposite direction (reverse bias). Standard silicon diodes require a forward voltage drop of ~0.7V to conduct.</p>
                        <p class="mb-4">Diodes are essential for converting Alternating Current (AC) to Direct Current (DC) in power adapters, a process called rectification.</p>`
                    },
                    {
                        title: "Lesson 3.2: Transistors as Switches",
                        content: `<p class="mb-4">Bipolar Junction Transistors (BJTs) and Field Effect Transistors (MOSFETs) act as electronic switches. Driving the control pin (base or gate) with a small current/voltage allows conducting a much larger current between the output pins (collector/emitter or drain/source).</p>
                        <p class="mb-4">This allows microcontrollers to drive heavy motors or relays from weak GPIO outputs.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the typical forward voltage drop of a silicon diode?", options: ["0.3V", "0.7V", "1.2V"], ans: 1 },
                        { q: "Which terminal in a MOSFET controls the conduction between source and drain?", options: ["Gate", "Base", "Collector"], ans: 0 },
                        { q: "What is the primary function of a rectifying diode?", options: ["To store static charge", "To amplify voltage", "To convert AC to DC"], ans: 2 }
                    ]
                },
                project: {
                    objective: "Build a transistor switch circuit to control a DC motor.",
                    components: ["NPN Transistor (PN2222)", "1k Ohm resistor", "DC Motor", "Flyback diode (1N4007)", "9V battery", "Breadboard"],
                    procedure: ["Connect transistor collector to motor.", "Place flyback diode in parallel with motor to block spikes.", "Connect emitter to ground.", "Apply 5V through the 1k resistor to the transistor base."],
                    expectedOutput: "The motor runs when voltage is applied to the base resistor and stops when the base is grounded."
                }
            },
            {
                title: "Module 4: Operational Amplifiers",
                desc: "Designing signal buffers, inverting, and non-inverting Op-Amp circuit configurations.",
                duration: "60 Min",
                lessons: [
                    {
                        title: "Lesson 4.1: Ideal Op-Amp Characteristics",
                        content: `<p class="mb-4">Operational Amplifiers (Op-Amps) are high-gain differential amplifiers. An ideal Op-Amp has:</p>
                        <ul class="list-disc pl-4 space-y-1 mb-4">
                            <li>Infinite input impedance (no input current draw).</li>
                            <li>Zero output impedance.</li>
                            <li>Infinite open-loop gain.</li>
                        </ul>
                        <p class="mb-4">Using negative feedback loops stabilizes the circuit, allowing precise control of gain parameters.</p>`
                    },
                    {
                        title: "Lesson 4.2: Gain Configurations",
                        content: `<p class="mb-4">The two primary gain configurations are:</p>
                        <ul class="list-disc pl-4 space-y-1 mb-4">
                            <li><strong>Non-Inverting Amplifier:</strong> Vo = Vi * (1 + Rf/Rin). Output is in phase.</li>
                            <li><strong>Inverting Amplifier:</strong> Vo = Vi * (-Rf/Rin). Output is inverted.</li>
                            <li><strong>Voltage Follower:</strong> Vo = Vi. Acts as a buffer to prevent signal loading.</li>
                        </ul>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the gain of a voltage follower (buffer) op-amp circuit?", options: ["0", "1", "Rf/Rin"], ans: 1 },
                        { q: "In a non-inverting op-amp config, if Rf = 10k and Rin = 1k, what is the gain?", options: ["10", "11", "9"], ans: 1 },
                        { q: "What does infinite input impedance mean for an op-amp?", options: ["It draws no current from the signal source", "It conducts high outputs", "It blocks all outputs"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Configure a non-inverting amplifier with a voltage gain of 2.",
                    components: ["LM741 Op-Amp", "Two 10k Ohm resistors", "9V dual power supply", "Signal generator", "Oscilloscope"],
                    procedure: ["Connect a 10k resistor from output to inverting input.", "Connect another 10k from inverting input to ground.", "Feed a 1V sine wave to the non-inverting input.", "Observe output on oscilloscope."],
                    expectedOutput: "The output is a clean sine wave with an amplitude of 2V, in phase with the input."
                }
            }
        ]
    },
    "rtos-development": {
        category: "Embedded Systems",
        title: "RTOS Development",
        desc: "Master real-time task scheduling, semaphores, mutexes, and thread synchronization in FreeRTOS.",
        difficulty: "Intermediate",
        duration: "14 Hours",
        lessons: 28,
        whatYouWillLearn: [
            "RTOS principles vs bare-metal schedulers",
            "Creating and running tasks in FreeRTOS",
            "Task synchronization with Semaphores and Mutexes",
            "Handling resource sharing and deadlock scenarios"
        ],
        skillsGained: [
            "RTOS Architecture",
            "Task Scheduling",
            "Resource Management"
        ],
        careerRelevance: "Highly sought skill for advanced embedded developers, safety-critical aerospace controllers, and automotive system engineers.",
        toolsRequired: "32-bit development board, FreeRTOS library source, debugger.",
        prerequisites: [
            "Pointers in C programming",
            "Microcontroller bare-metal basics"
        ],
        certDetail: {
            available: "Yes",
            assessment: "RTOS Task Synchronization quiz (100% correct required)",
            verification: "Supported (Database verification)",
            idPrefix: "TL-2026-00007"
        },
        modules: [
            {
                title: "Module 1: Introduction to RTOS Schedulers",
                desc: "Core mechanics of real-time scheduling and preemptive context switching.",
                duration: "60 Min",
                lessons: [
                    {
                        title: "Lesson 1.1: What is a Real-Time Operating System?",
                        content: `<p class="mb-4">A Real-Time Operating System (RTOS) is an operating system intended to serve real-time applications that process data as it comes in, typically without buffer delays.</p>
                        <p class="mb-4">The key characteristic of an RTOS is the level of its consistency concerning the amount of time it takes to accept and complete an application's task. Unlike generic OS schedulers, an RTOS guarantees deterministic response behaviors.</p>`
                    },
                    {
                        title: "Lesson 1.2: Preemption and Context Switching",
                        content: `<p class="mb-4">In a preemptive scheduler, the executing task can be interrupted and placed in the Ready state if a higher priority task becomes available to run.</p>
                        <p class="mb-4">The process of saving the execution state (program counter, stack pointers, registers) of the running task and loading the state of the new task is called a context switch, managed by the scheduler's kernel port.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What scheduling strategy suspends a lower priority task immediately for a higher one?", options: ["Cooperative", "Preemptive", "Round-Robin"], ans: 1 },
                        { q: "What does deterministic behavior mean in an RTOS context?", options: ["Task execution timing is predictable and guaranteed", "Tasks run as fast as possible", "The scheduler picks tasks at random"], ans: 0 },
                        { q: "Which memory structure stores a task's CPU registers during context switching?", options: ["Global variables section", "Task stack", "Heap memory"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Create two basic tasks in FreeRTOS.",
                    components: ["STM32 Nucleo Board", "FreeRTOS config", "IDE Toolchain"],
                    procedure: ["Declare task functions.", "Use xTaskCreate to register tasks with different priorities.", "Start the FreeRTOS scheduler loop."],
                    expectedOutput: "Both tasks run in their respective intervals under scheduler control."
                }
            },
            {
                title: "Module 2: Task Priorities & States",
                desc: "Understanding FreeRTOS scheduler weights, blocked/running states, and task yield controls.",
                duration: "60 Min",
                lessons: [
                    {
                        title: "Lesson 2.1: FreeRTOS Task States",
                        content: `<p class="mb-4">A FreeRTOS task exists in one of the following states:</p>
                        <ul class="list-disc pl-4 space-y-1 mb-4">
                            <li><strong>Running:</strong> Currently executing on the CPU core.</li>
                            <li><strong>Ready:</strong> Able to execute but waiting for CPU allocation.</li>
                            <li><strong>Blocked:</strong> Waiting for a time delay (e.g., delay ticks) or a resource event.</li>
                            <li><strong>Suspended:</strong> Taken out of scheduler rotation entirely.</li>
                        </ul>`
                    },
                    {
                        title: "Lesson 2.2: Scheduler Tick rate and vTaskDelay",
                        content: `<p class="mb-4">The kernel tick timer interrupt runs at a configurable frequency (commonly 1000Hz, or a 1ms period). Using <code>vTaskDelay(500)</code> puts the task into the Blocked state for 500 tick interrupts, allowing lower priority tasks to run.</p>
                        <p class="mb-4">Using busy delay loops (like <code>for</code> or <code>while</code> loops) keeps the task in the Running state, blocking other tasks of lower priority and wasting CPU cycles.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which state represents a task that is prepared to run but waiting for CPU allocation?", options: ["Running", "Ready", "Blocked"], ans: 1 },
                        { q: "What FreeRTOS API function is used to delay a task and move it to the Blocked state?", options: ["vTaskDelay", "xTaskYield", "vTaskSuspend"], ans: 0 },
                        { q: "What happens when two Ready tasks have the exact same priority in FreeRTOS?", options: ["The scheduler crashes", "They share CPU time via Round-Robin scheduling", "Only the task created first runs"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Configure task yields using vTaskDelay to toggle two onboard LEDs.",
                    components: ["32-bit MCU Board", "FreeRTOS kernel", "Two LEDs"],
                    procedure: ["Create Task A and Task B with priority 1.", "Use vTaskDelay(500) in Task A and vTaskDelay(1000) in Task B.", "Start the scheduler and observe execution times."],
                    expectedOutput: "LED A toggles every 500ms and LED B toggles every 1000ms without blocking each other."
                }
            },
            {
                title: "Module 3: Semaphores & Mutexes",
                desc: "Resolving resource sharing race conditions, priority inversion, and mutex locks.",
                duration: "65 Min",
                lessons: [
                    {
                        title: "Lesson 3.1: Semaphores for Synchronization",
                        content: `<p class="mb-4">Semaphores are token-based synchronization tokens:</p>
                        <ul class="list-disc pl-4 space-y-1 mb-4">
                            <li><strong>Binary Semaphores:</strong> Hold either 0 or 1 token. Ideal for task-to-interrupt synchronization (unblocking a task when an interrupt fires).</li>
                            <li><strong>Counting Semaphores:</strong> Hold multiple tokens. Used to manage pools of resources.</li>
                        </ul>`
                    },
                    {
                        title: "Lesson 3.2: Mutexes and Priority Inversion",
                        content: `<p class="mb-4">A Mutex is a binary semaphore that supports priority inheritance. Priority inversion occurs when a low-priority task holds a lock that a high-priority task needs, and a medium-priority task preempts the low-priority task, indefinitely blocking the high-priority task.</p>
                        <p class="mb-4">Priority inheritance temporarily raises the low-priority task's priority to match the high-priority task's level while it holds the lock, resolving the block.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What mechanism solves the Priority Inversion problem in FreeRTOS?", options: ["Task yield", "Priority Inheritance", "Round-Robin scheduling"], ans: 1 },
                        { q: "What object is best suited to synchronize a task with a hardware interrupt?", options: ["Binary Semaphore", "Mutex", "Global integer"], ans: 0 },
                        { q: "What is the key difference between a Mutex and a Binary Semaphore?", options: ["Mutexes support task ownership and priority inheritance", "Mutexes cannot be taken", "Binary semaphores are faster"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Protect a shared print buffer using a Mutex.",
                    components: ["32-bit MCU Board", "USART transceiver", "FreeRTOS Mutex library"],
                    procedure: ["Create two tasks that print long strings to USART.", "Create a mutex wrapper around the print call.", "Run both tasks simultaneously and verify serial outputs."],
                    expectedOutput: "Printed strings appear sequentially on the serial console without letter scrambling."
                }
            },
            {
                title: "Module 4: Queues & Inter-task Communication",
                desc: "Passing safe message buffers between concurrent threads using FreeRTOS queues.",
                duration: "70 Min",
                lessons: [
                    {
                        title: "Lesson 4.1: Thread-safe Queues",
                        content: `<p class="mb-4">Queues are the primary form of inter-task communication. They are FIFO (First-In, First-Out) memory buffers. Reading or writing to a queue is thread-safe and manages task states automatically.</p>
                        <p class="mb-4">If a task attempts to read from an empty queue, the scheduler blocks the task until data is written, avoiding CPU polling loops.</p>`
                    },
                    {
                        title: "Lesson 4.2: Event Groups and Notifications",
                        content: `<p class="mb-4">Event groups allow tasks to wait for combinations of bit flags. Task notifications are lightweight, fast alternatives to semaphores and queues that write directly to the target task's structure, saving RAM overhead.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "How is data passed into a FreeRTOS queue by default?", options: ["By reference", "By value (copied directly)", "Through pointers only"], ans: 1 },
                        { q: "How many bits are available for flags in a 32-bit FreeRTOS event group?", options: ["8 bits", "24 bits", "32 bits"], ans: 1 },
                        { q: "Why are queues preferred over global variables for task communication?", options: ["They use less memory", "They provide automatic task blocking and thread-safety", "They require no configuration"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Build a producer-consumer system passing sensor data structure.",
                    components: ["32-bit MCU Board", "FreeRTOS Queue API"],
                    procedure: ["Define a structure containing temperature and humidity values.", "Create a Queue of size 5.", "Write a producer task to post readings.", "Write a consumer task to print readings."],
                    expectedOutput: "The consumer task wakes up and prints data logs exactly when the producer sends a new structure."
                }
            }
        ]
    },
    "aiot-engineering": {
        category: "AIoT",
        title: "AIoT Engineering",
        desc: "Deploy deep learning models on edge microcontrollers and route sensor data through IoT channels.",
        difficulty: "Intermediate",
        duration: "16 Hours",
        lessons: 34,
        whatYouWillLearn: [
            "Building telemetry data paths with ESP32 & MQTT",
            "Edge AI architecture and ML model quantization",
            "Running inference on microcontrollers with TensorFlow Lite Micro",
            "Visualizing sensor predictions on cloud dashboards"
        ],
        skillsGained: [
            "Edge ML Deployment",
            "MQTT Telemetry",
            "TensorFlow Lite Micro"
        ],
        careerRelevance: "High-demand skill for smart device developers, AIoT software engineers, and automated warehouse system leads.",
        toolsRequired: "ESP32-S3 Camera Board, TensorFlow Lite packages, MQTT broker.",
        prerequisites: [
            "Python basics for ML modeling",
            "ESP32 Wi-Fi configuration basics"
        ],
        certDetail: {
            available: "Yes",
            assessment: "Edge AI telemetry deployment exam (100% correct required)",
            verification: "Supported (Database verification)",
            idPrefix: "TL-2026-00008"
        },
        modules: [
            {
                title: "Module 1: Edge AI Basics",
                desc: "Introduction to model training, quantization, and microcontroller deployment frameworks.",
                duration: "60 Min",
                lessons: [
                    {
                        title: "Lesson 1.1: AI at the Edge",
                        content: `<p class="mb-4">Edge AI refers to deploying machine learning models directly onto hardware devices (like microcontrollers) instead of sending sensor data to a remote cloud server. This reduces latency, saves bandwidth, and increases privacy.</p>
                        <p class="mb-4">However, edge hardware has tight hardware constraints, requiring specialized tinyML frameworks and model compression techniques.</p>`
                    },
                    {
                        title: "Lesson 1.2: TensorFlow Lite Micro Overview",
                        content: `<p class="mb-4">TensorFlow Lite Micro (TFLM) is a lightweight C++ interpreter designed to run neural network inference on chips with only kilobytes of memory.</p>
                        <p class="mb-4">It does not require dynamic memory allocation (<code>malloc</code>), operating system support, or float-point hardware accelerators.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What process reduces model sizes by converting floating point weights to 8-bit integers?", options: ["Quantization", "Gradient Descent", "Compilation"], ans: 0 },
                        { q: "Why is Edge AI preferred over Cloud AI for real-time collision detection?", options: ["It features lower latency", "It allows larger model sizes", "It requires more server bandwidth"], ans: 0 },
                        { q: "Does TensorFlow Lite Micro require dynamic memory allocation at runtime?", options: ["Yes, for storing inputs", "No, it operates entirely on static buffers", "Only when running on ARM chips"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Configure a basic TensorFlow Lite Micro interpreter on ESP32.",
                    components: ["ESP32-S3 board", "TF Micro library"],
                    procedure: ["Load quantized model array.", "Set up tensor arena memory.", "Run mock inference with dummy input."],
                    expectedOutput: "The ESP32 logs prediction probabilities without cloud connection."
                }
            },
            {
                title: "Module 2: ESP32 Telemetry & MQTT",
                desc: "Configuring local Wi-Fi, publishing telemetry data, and parsing custom JSON command packets.",
                duration: "60 Min",
                lessons: [
                    {
                        title: "Lesson 2.1: Wi-Fi Stack and TCP/IP on ESP32",
                        content: `<p class="mb-4">The ESP32 microcontroller houses an integrated 2.4GHz Wi-Fi radio. In firmware, we utilize the ESP-IDF Wi-Fi driver and LwIP TCP/IP stack to configure stations, request IP addresses, and handle network reconnections.</p>`
                    },
                    {
                        title: "Lesson 2.2: The MQTT Protocol",
                        content: `<p class="mb-4">MQTT (Message Queuing Telemetry Transport) is a lightweight publish-subscribe protocol running over TCP. Devices (clients) publish data to logical path strings called 'topics' hosted on an MQTT broker. Other clients subscribe to those topics to receive real-time telemetry updates.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which MQTT QoS level guarantees a message is delivered exactly once?", options: ["QoS 0", "QoS 1", "QoS 2"], ans: 2 },
                        { q: "What is the default TCP port for unencrypted MQTT connections?", options: ["80", "1883", "8883"], ans: 1 },
                        { q: "What does the publish-subscribe pattern decouple?", options: ["Voltage levels", "Data encoders", "Producers and consumers of data"], ans: 2 }
                    ]
                },
                project: {
                    objective: "Establish connection to a public MQTT broker and publish test telemetry.",
                    components: ["ESP32 board", "Wi-Fi Router Access", "MQTT Broker Connection"],
                    procedure: ["Code Wi-Fi credentials in firmware.", "Initialize ESP-MQTT library.", "Publish a JSON payload containing sensor mock variables to topic 'thrulabs/sensor/temp'."],
                    expectedOutput: "Telemetry publishes successfully and appears on the MQTT subscriber terminal."
                }
            },
            {
                title: "Module 3: ML Model Quantization",
                desc: "Using Post-Training Quantization (PTQ) to shrink ML model arrays from float32 to int8 formats.",
                duration: "65 Min",
                lessons: [
                    {
                        title: "Lesson 3.1: Mathematical Mapping of Quantization",
                        content: `<p class="mb-4">Quantization maps a wide range of floating-point values (32-bit float) to a narrow range of integers (8-bit signed integer). The linear mapping equation is:</p>
                        <div class="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 font-mono text-[10px] text-center">
                            r = S * (q - Z)
                        </div>
                        <p class="mb-4">Where <code>r</code> is the real float value, <code>S</code> is the scale factor, <code>q</code> is the quantized integer, and <code>Z</code> is the zero-point offset.</p>`
                    },
                    {
                        title: "Lesson 3.2: Post-Training Quantization",
                        content: `<p class="mb-4">Post-Training Quantization (PTQ) compresses a model after it has finished training. Using a representative dataset of typical input samples allows calibration of dynamic range activations, preserving model accuracy during conversion.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What percentage size reduction is achieved when converting a model from float32 to int8?", options: ["50%", "75%", "90%"], ans: 1 },
                        { q: "Why is integer math preferred on edge microcontrollers?", options: ["It is more accurate", "Most tiny microcontrollers lack floating-point hardware accelerators", "It increases model capacity"], ans: 1 },
                        { q: "What is the role of a representative dataset in quantization?", options: ["To retrain the model weights", "To calibrate the dynamic range of activations", "To check the network speed"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Convert a Keras model to a quantized TensorFlow Lite flatbuffer array.",
                    components: ["Python environment", "TensorFlow framework packages"],
                    procedure: ["Load a trained Keras model.", "Configure TFLiteConverter with optimization flags.", "Export static C-array header file."],
                    expectedOutput: "A compiled header file containing the model weights as a static byte array."
                }
            },
            {
                title: "Module 4: On-Chip Inference & Deployment",
                desc: "Running local machine learning model logic on ESP32 chips using TensorFlow Lite Micro.",
                duration: "70 Min",
                lessons: [
                    {
                        title: "Lesson 4.1: Allocating the Tensor Arena",
                        content: `<p class="mb-4">Unlike standard Python environments that allocate memory dynamically, TensorFlow Lite Micro requires the developer to allocate a static byte array called the <strong>Tensor Arena</strong>.</p>
                        <p class="mb-4">All intermediate calculations, input tensors, and output tensors are stored within this arena space. Under-allocating this array causes the interpreter initialization to fail.</p>`
                    },
                    {
                        title: "Lesson 4.2: Writing the Inference Loop",
                        content: `<p class="mb-4">The edge inference sequence consists of three structural steps:</p>
                        <ul class="list-disc pl-4 space-y-1 mb-4">
                            <li>Copy raw digital sensor values into the interpreter's input tensor.</li>
                            <li>Call <code>interpreter-&gt;Invoke()</code> to run the model layers.</li>
                            <li>Read classification probabilities or regression outputs from the output tensor.</li>
                        </ul>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the static memory array allocated to store intermediate variables during TF Micro inference?", options: ["Tensor Arena", "Heap Stack", "DMA buffer"], ans: 0 },
                        { q: "Which interpreter method is called to execute model inference?", options: ["Run()", "Start()", "Invoke()"], ans: 2 },
                        { q: "Where are model output predictions read from after invocation?", options: ["SRAM buffers", "Output Tensors", "Input Tensors"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Run local sine-wave approximation inference on the ESP32 chip.",
                    components: ["ESP32-S3 Board", "TF Lite Micro library", "model array header"],
                    procedure: ["Initialize interpreter.", "Allocate a 10KB Tensor Arena.", "Feed x-coordinates in a loop.", "Log predicted y-values."],
                    expectedOutput: "The ESP32 logs correct math outputs matching a sine curve on the serial console."
                }
            }
        ]
    },
    "advanced-embedded-systems": {
        category: "Embedded Systems",
        title: "Advanced Embedded Systems",
        desc: "Dive deep into hardware registers, DMA pipelines, low-power modes, and device driver development.",
        difficulty: "Intermediate",
        duration: "18 Hours",
        lessons: 40,
        whatYouWillLearn: [
            "Direct memory access (DMA) high-speed transfer configs",
            "Configuring microcontroller low-power modes and wake-up events",
            "Writing re-entrant device drivers for SPI and I2C buses",
            "Memory protection unit (MPU) configurations"
        ],
        skillsGained: [
            "DMA Controls",
            "Low-power Config",
            "Device Driver Writing"
        ],
        careerRelevance: "Essential for expert firmware developers, principal hardware designers, and defense systems engineers.",
        toolsRequired: "Advanced 32-bit MCU development board, logic analyzer.",
        prerequisites: [
            "Completed Embedded Systems Essentials course",
            "Strong C programming and hardware registry knowledge"
        ],
        certDetail: {
            available: "Yes",
            assessment: "DMA and Driver registration exam (100% correct required)",
            verification: "Supported (Database verification)",
            idPrefix: "TL-2026-00009"
        },
        modules: [
            {
                title: "Module 1: Direct Memory Access (DMA)",
                desc: "Bypassing CPU cycles for high-speed hardware data transfers.",
                duration: "70 Min",
                lessons: [
                    {
                        title: "Lesson 1.1: The Power of DMA",
                        content: `<p class="mb-4">Direct Memory Access (DMA) allows hardware subsystems to access main system memory independently of the central processing unit (CPU). This is crucial for high-speed communication since the CPU does not have to copy each byte individually, freeing it up for computation.</p>
                        <p class="mb-4">By offloading data transfer loops (e.g., streaming ADC buffers directly to SRAM), the CPU can go to sleep or execute heavy DSP equations.</p>`
                    },
                    {
                        title: "Lesson 1.2: DMA Channels, Streams, and Double Buffering",
                        content: `<p class="mb-4">DMA controllers manage multiple channels mapped to specific hardware peripherals. Double buffering uses two memory blocks: while the DMA controller is writing new data into Buffer A, the CPU reads processed data from Buffer B, switching roles when the transfer completes.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which component handles data copy from peripheral registers directly to SRAM?", options: ["CPU Scheduler", "DMA Controller", "NVIC"], ans: 1 },
                        { q: "What is the primary benefit of double buffering?", options: ["It speeds up clock signals", "It prevents memory read/write collisions", "It uses less RAM"], ans: 1 },
                        { q: "Does DMA copy require active CPU instruction execution cycles?", options: ["Yes, for every byte", "No, it transfers data independently of the CPU", "Only on 8-bit controllers"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Configure a DMA stream to copy ADC buffer registers to SRAM automatically.",
                    components: ["32-bit MCU Board", "Multimeter"],
                    procedure: ["Initialize ADC peripheral.", "Configure DMA channel matching ADC trigger.", "Enable DMA double buffer."],
                    expectedOutput: "ADC samples populate memory array without CPU intervention."
                }
            },
            {
                title: "Module 2: Low-Power Modes & Sleep Registers",
                desc: "Configuring sleep, stop, and standby modes with active RTC and external wakeup events.",
                duration: "70 Min",
                lessons: [
                    {
                        title: "Lesson 2.1: Microcontroller Low-Power States",
                        content: `<p class="mb-4">To maximize battery life, modern microcontrollers support distinct power-saving states:</p>
                        <ul class="list-disc pl-4 space-y-1 mb-4">
                            <li><strong>Sleep Mode:</strong> Only the CPU core stops. Peripherals and clocks continue running. Very fast wakeup.</li>
                            <li><strong>Stop Mode:</strong> Clocks to the core and peripherals are halted. SRAM and registers are preserved. Wakeup takes microseconds.</li>
                            <li><strong>Standby Mode:</strong> Internal voltage regulator is shut down. Registers and SRAM contents are lost. Wakeup takes milliseconds and acts as a cold reboot.</li>
                        </ul>`
                    },
                    {
                        title: "Lesson 2.2: Wakeup Triggers and Clock Gating",
                        content: `<p class="mb-4">Waking up from deep sleep states requires configuring asynchronous events, such as external GPIO interrupts, real-time clock (RTC) alarms, or watchdog reset events.</p>
                        <p class="mb-4">Clock gating disables clock feeds to unused peripherals during run mode, cutting dynamic power draw.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "Which low-power mode preserves SRAM contents but shuts down all system clocks?", options: ["Sleep Mode", "Stop Mode", "Standby Mode"], ans: 1 },
                        { q: "Which hardware component can wake an MCU from Standby mode at a specific time?", options: ["RTC (Real-Time Clock)", "Timer 1", "SRAM Controller"], ans: 0 },
                        { q: "What does clock gating accomplish?", options: ["Reduces dynamic power by cutting clocks to inactive peripherals", "Increases voltage rails", "Speeds up CPU calculations"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Measure current draw reduction using Stop mode.",
                    components: ["32-bit MCU Board", "External Multimeter", "Push-button switch"],
                    procedure: ["Measure run-mode current draw.", "Write code to configure MCU to enter Stop mode.", "Measure low-power current draw.", "Wake the MCU using a GPIO button interrupt."],
                    expectedOutput: "Current draw drops from 20mA to under 10uA in Stop mode, rising back to 20mA on button press."
                }
            },
            {
                title: "Module 3: Device Driver Development",
                desc: "Writing bare-metal hardware drivers for SPI and I2C peripherals using device datasheets.",
                duration: "75 Min",
                lessons: [
                    {
                        title: "Lesson 3.1: Register-level Peripheral Control",
                        content: `<p class="mb-4">Device drivers interact with hardware by reading and writing to memory-mapped registers. In C, registers are declared as volatile pointers to prevent the compiler from optimizing out repeated read/write access loops:</p>
                        <pre class="bg-black/40 border border-white/5 p-3 rounded-lg text-[9px] text-emerald-400 font-mono overflow-x-auto leading-relaxed mb-4">
#define GPIOA_MODER *((volatile uint32_t*)0x40020000)</pre>`
                    },
                    {
                        title: "Lesson 3.2: SPI and I2C Driver Routines",
                        content: `<p class="mb-4">Writing bus drivers requires matching peripheral timing protocols. For I2C, you must generate START/STOP conditions and verify ACKs. For SPI, you must control chip select (CS) lines and read/write shift buffers concurrently.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What keyword prevents the compiler from optimizing memory-mapped register pointer accesses?", options: ["static", "volatile", "register"], ans: 1 },
                        { q: "Which event starts any I2C bus transaction?", options: ["Pulling SDA low while SCL remains high", "Setting SCL low", "Generating an ACK bit"], ans: 0 },
                        { q: "What does it mean if a register is designated read-only?", options: ["Writing has no effect and only reflects hardware status", "It can only be read once", "It stores instructions"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Write a bare-metal register driver for an SPI temperature sensor.",
                    components: ["32-bit MCU Board", "SPI Temperature Sensor", "Logic Analyzer"],
                    procedure: ["Set SPI configuration registers for clock polarity.", "Implement transfer function.", "Read raw temperature register address.", "Convert data bytes."],
                    expectedOutput: "MCU reads raw sensor registers and prints temperature logs accurately."
                }
            },
            {
                title: "Module 4: Memory Protection & Safety",
                desc: "Configuring Hardware MPUs, watchdog recovery, and performing stack buffer audits.",
                duration: "80 Min",
                lessons: [
                    {
                        title: "Lesson 4.1: The Memory Protection Unit (MPU)",
                        content: `<p class="mb-4">The Memory Protection Unit (MPU) monitors memory transactions. It divides the memory map into regions and assigns access privileges (e.g., user mode tasks cannot write to operating system code space or core registers).</p>
                        <p class="mb-4">If a task attempts unauthorized access, the MPU triggers a hard fault exception, preventing system-wide crashes.</p>`
                    },
                    {
                        title: "Lesson 4.2: Watchdogs and Stack Overflows",
                        content: `<p class="mb-4">Watchdog timers boot the system if code hangs. Stack overflows are detected by checking 'guard bands'—unique byte patterns written at the end of stack boundaries that trigger errors if overwritten.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What CPU exception is triggered when a task accesses unauthorized memory?", options: ["MemManage Fault / Hard Fault", "NMI", "Usage Fault"], ans: 0 },
                        { q: "How does a Watchdog Timer prevent system lockups?", options: ["It resets the system if not periodically cleared", "It scales CPU speed", "It blocks interrupts"], ans: 0 },
                        { q: "What is a stack guard band?", options: ["A reserved memory pattern checked to detect stack overflows", "A hardware filter", "A compile variable"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Configure a Windowed Watchdog Timer (WWDG) to reset on system freeze.",
                    components: ["MCU Development Board"],
                    procedure: ["Initialize WWDG registers.", "Add watchdog refresh code inside main loop.", "Simulate a deadlock hang using an infinite delay.", "Observe system recovery reset."],
                    expectedOutput: "The MCU resets automatically and logs a watchdog reset code on boot when the loop freezes."
                }
            }
        ]
    },
    "industry-project-programs": {
        category: "Embedded Systems",
        title: "Industry Project Programs",
        desc: "Build and document enterprise-grade electronics and firmware prototypes matching industry standards.",
        difficulty: "Intermediate",
        duration: "20 Hours",
        lessons: 10,
        whatYouWillLearn: [
            "Industrial design requirements and safety standards",
            "Sourcing parts, compiling BOMs, and reviewing design constraints",
            "Designing multi-layer circuit boards with custom shielding",
            "Writing extensive engineering tests and documentation"
        ],
        skillsGained: [
            "Industrial PCB Layout",
            "Engineering Reports",
            "Parts Sourcing"
        ],
        careerRelevance: "Crucial for system design leaders, engineering consultants, and research and development engineers.",
        toolsRequired: "PCB CAD Suite, hardware test lab tools.",
        prerequisites: [
            "Completed PCB design and Embedded firmware courses"
        ],
        certDetail: {
            available: "Yes",
            assessment: "Product design review and checklist clearance",
            verification: "Supported (Database verification)",
            idPrefix: "TL-2026-00010"
        },
        modules: [
            {
                title: "Module 1: Engineering Product Design Lifecycle",
                desc: "Design steps from specification documents to functional certified product.",
                duration: "80 Min",
                lessons: [
                    {
                        title: "Lesson 1.1: The Lifecycle Phases",
                        content: `<p class="mb-4">Developing industrial electronics requires following rigid phases: requirements analysis, schematic capture, layout design, prototyping, testing, verification, FCC/CE certification review, and manufacturing transfer.</p>
                        <p class="mb-4">Strict engineering logs and design reviews ensure quality and reduce costs before ordering factory assembly runs.</p>`
                    },
                    {
                        title: "Lesson 1.2: Design Specification Documentation",
                        content: `<p class="mb-4">A design specification document lists target features, electrical voltage tolerances, environmental operating bounds, and manufacturing cost limits, guiding design decisions.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is a document listing all components, quantities, and reference designators called?", options: ["Schematic", "Bill of Materials (BOM)", "Data Sheet"], ans: 1 },
                        { q: "Which phase determines electrical properties and components layout?", options: ["Schematic & Board Layout", "Product Shipping", "Customer Marketing"], ans: 0 },
                        { q: "Why is CE/FCC compliance testing necessary?", options: ["To guarantee high-speed software execution", "To legally sell digital electronic products in the market", "To check component costs"], ans: 1 }
                    ]
                },
                project: {
                    objective: "Compile a professional BOM sheet matching design rules.",
                    components: ["Computer", "Electronic parts database browser"],
                    procedure: ["Select component models.", "Write manufacturer codes, quantities, and package details in a sheet.", "Check components lifecycle availability status."],
                    expectedOutput: "A complete BOM sheet listing parts, packages, costs, and alternates."
                }
            },
            {
                title: "Module 2: Sourcing Components & BOM Management",
                desc: "Selecting electrical parts, planning power budgets, and organizing manufacturer spreadsheets.",
                duration: "80 Min",
                lessons: [
                    {
                        title: "Lesson 2.1: Sourcing Parameters",
                        content: `<p class="mb-4">When choosing components for production, engineers must evaluate electrical tolerances, thermal dissipation coefficients, package sizes, price scales, and lifecycle availability (e.g., avoiding Obsolete parts).</p>`
                    },
                    {
                        title: "Lesson 2.2: Managing the Bill of Materials",
                        content: `<p class="mb-4">A structured Bill of Materials (BOM) contains manufacture codes, supplier links, package footprints, and pricing. Identifying pin-compatible alternates protects production runs from supply chain delays.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What parameter indicates if a component is active, deprecated, or obsolete?", options: ["Lifecycle Status", "Tolerance", "Footprint"], ans: 0 },
                        { q: "Why is it important to define secondary source alternates in a BOM?", options: ["To prevent production stops due to supplier shortages", "To increase board sizes", "To speed up routing"], ans: 0 },
                        { q: "What does footprint refer to in electronic component sourcing?", options: ["Physical package size and layout of solder pads on the PCB", "The carbon footprint of shipping", "The power dissipation rate"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Build a complete component budget sheet for an IoT sensor hub.",
                    components: ["Part datasheet access", "Sourcing portal access"],
                    procedure: ["Find MCU, voltage regulator, sensor, and passive models.", "List quantities, package specs, and costs for 1000 unit production.", "Verify price scaling limits."],
                    expectedOutput: "A structured BOM CSV sheet showing total build cost under $12 per board."
                }
            },
            {
                title: "Module 3: Multi-layer PCB Layout Design",
                desc: "Handling differential trace impedances, multi-layer stackups, and shielding rings.",
                duration: "90 Min",
                lessons: [
                    {
                        title: "Lesson 3.1: Multi-layer Stackup Configurations",
                        content: `<p class="mb-4">High-speed and dense designs require 4 or more layer PCBs. Ground planes and power planes occupy inner layers. This provides low-impedance signal return paths, reducing electromagnetic interference (EMI) loops.</p>`
                    },
                    {
                        title: "Lesson 3.2: Controlled Impedance and High-Speed Routing",
                        content: `<p class="mb-4">High-frequency signals (e.g., USB, Ethernet, RF) must be routed over transmission lines with matched characteristic impedance (e.g., 90 or 50 Ohms) calculated from track width and dielectric height parameters.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the benefit of routing ground planes directly beneath high-speed signals?", options: ["Minimizes loop area and reduces EMI", "It decreases track resistance", "It increases voltage values"], ans: 0 },
                        { q: "What trace geometry parameters determine its characteristic impedance?", options: ["Length only", "Trace width, dielectric height, and dielectric constant", "Voltage levels"], ans: 1 },
                        { q: "Why are vias avoided in high-frequency RF transmission traces?", options: ["They introduce capacitive and inductive impedance discontinuities", "They are too expensive", "They disconnect tracks"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Route a USB differential data pair in KiCad.",
                    components: ["KiCad Layout Editor Software"],
                    procedure: ["Configure differential pair constraints (90 Ohm impedance).", "Route lines in parallel.", "Keep length matching within 1mm tolerances."],
                    expectedOutput: "Routed board layout passes DRC check with correct differential pair widths and matched lengths."
                }
            },
            {
                title: "Module 4: Testing, Verification & Compliance",
                desc: "Developing hardware test plans, utilizing debug probes, and preparing FCC/CE folders.",
                duration: "90 Min",
                lessons: [
                    {
                        title: "Lesson 4.1: Prototype Bring-up Procedures",
                        content: `<p class="mb-4">Bringing up a new hardware board requires structured tests. Before applying power, check for shorts between power rails and ground. Power the board using a current-limiting power supply, check voltage regulator outputs, and probe clocks.</p>`
                    },
                    {
                        title: "Lesson 4.2: EMC Compliance and Certifications",
                        content: `<p class="mb-4">Commercial electronics must undergo electromagnetic compatibility (EMC) testing. Radiated and conducted emissions must stay below limits defined by agencies (FCC Part 15 in the US, CE in Europe) before product sales are legally allowed.</p>`
                    }
                ],
                quiz: {
                    questions: [
                        { q: "What is the very first step in bringing up a newly manufactured prototype board?", options: ["Check for short circuits between power rails and ground", "Flash the main operating system", "Run at full power overnight"], ans: 0 },
                        { q: "What regulatory certification is required to legally sell digital electronics in the United States?", options: ["FCC Certification", "IEEE Standard Approval", "CE Mark"], ans: 0 },
                        { q: "What is the difference between radiated and conducted emissions?", options: ["Radiated travels through air; conducted travels along power cables", "Conducted is digital; radiated is analog", "There is no difference"], ans: 0 }
                    ]
                },
                project: {
                    objective: "Author a detailed hardware test plan document for a wireless gateway.",
                    components: ["Documentation editor or Markdown processor"],
                    procedure: ["Write step-by-step procedures for power checks.", "Define firmware flashing diagnostics.", "Include radio power validation tests."],
                    expectedOutput: "A detailed test plan specifying voltage limits, diagnostic steps, and pass/fail criteria."
                }
            }
        ]
    }
};

.. title:: ESPHome - Smart Home Made Simple

.. meta::
    :google-site-verification: Q5q5TFbCofxA8-cSa1Frv5Hj4RopF5zwEZf_zaNHqf4

.. seo::
    :description: ESPHome - Smart Home Made Simple. ESPHome turns ESP8266 and ESP32 microcontrollers into fully-featured smart home devices with just a few lines of YAML configuration. No programming experience required.
    :image: logo.svg

.. raw:: html

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="_static/index.css">

    <div class="nav-container">
        <nav class="sticky-nav">
            <div class="nav-logo">
                <a href="/"><img src="_images/logo.svg" alt="ESPHome Logo" height="30"></a>
            </div>
            <div class="nav-links">
                <div class="dropdown">
                    <button type="button" class="dropbtn" aria-haspopup="true" aria-expanded="false">Getting Started</button>
                    <div class="dropdown-content">
                        <a href="/guides/getting_started_hassio.html">From Home Assistant</a>
                        <a href="/guides/getting_started_command_line.html">Using Command Line</a>
                        <a href="/projects/">Ready-Made Projects</a>
                        <a href="/guides/migrate_sonoff_tasmota.html">Migrate from Tasmota</a>
                        <a href="/guides/faq.html">FAQ and Tips</a>
                    </div>
                </div>
                <div class="dropdown">
                    <button type="button" class="dropbtn" aria-haspopup="true" aria-expanded="false">Next Steps</button>
                    <div class="dropdown-content">
                        <a href="/components/">Documentation</a>
                        <a href="/automations/">Automations</a>
                        <a href="/guides/configuration-types.html">Configuration Types</a>
                        <a href="https://devices.esphome.io/">Device Examples</a>
                        <a href="/guides/diy.html">DIY Examples</a>
                        <a href="/guides/creators.html">Sharing ESPHome Devices</a>
                        <a href="/guides/made_for_esphome.html">Made for ESPHome</a>
                    </div>
                </div>
                <div class="dropdown">
                    <button type="button" class="dropbtn" aria-haspopup="true" aria-expanded="false">Keeping Up</button>
                    <div class="dropdown-content">
                        <a href="/changelog/">Changelog</a>
                        <a href="https://discord.gg/KhAMKrd">Discord</a>
                        <a href="https://community.home-assistant.io/c/esphome/">Forums</a>
                        <a href="/guides/contributing.html">Contributing</a>
                        <a href="/guides/supporters.html">Supporters</a>
                    </div>
                </div>
                <div class="nav-search">
                    <div id="nav-search-container" style="position: relative;"></div>
                    <div id="nav-search-results"></div>
                </div>
            </div>
        </nav>
    </div>

    <script src="/pagefind/pagefind-modular-ui.js"></script>
    <script src="/_static/index.js" defer></script>

.. raw:: html
    :file: images/logo-text.svg

.. raw:: html

    <div class="hero-container">
        <div class="hero-content">
            <h1>Smart Home Made Simple</h1>
            <p>Turn your ESP8266, ESP32 or RP2040 boards into powerful smart home devices with simple YAML configuration</p>
        </div>
        <div class="hero-image">
            <img src="_images/hero.png" alt="ESPHome devices" />
        </div>
    </div>

.. _what-is-esphome:

What is ESPHome?
================

ESPHome is an open-source firmware framework that simplifies the process of creating custom firmware for popular WiFi-enabled microcontrollers. With ESPHome, you can:

* **Create custom smart home devices** using simple YAML configuration files
* **Integrate seamlessly with Home Assistant** for a unified smart home experience
* **Control and monitor** your devices through multiple interfaces (web, API, MQTT)
* **Automate your home** with powerful on-device automations
* **Update your devices wirelessly** "Over The Air" (OTA) updates without physical access

ESPHome takes care of the complex parts of firmware development, allowing you to focus on what matters - building your smart home exactly how you want it.

.. raw:: html

    <div class="feature-grid">
        <div class="feature-card">
            <h3><div class="feature-icon"><i class="fas fa-code"></i></div>No Coding Required</h3>
            <p>Simple YAML configuration files instead of complex C++ code</p>
        </div>
        <div class="feature-card">
            <h3><div class="feature-icon"><i class="fas fa-wifi"></i></div>Wireless Updates</h3>
            <p>Update your devices over-the-air without physical access</p>
        </div>
        <div class="feature-card">
            <h3><div class="feature-icon"><i class="fas fa-puzzle-piece"></i></div>Modular Design</h3>
            <p>Support for hundreds of sensors, displays, and other components</p>
        </div>
        <div class="feature-card">
            <h3><div class="feature-icon"><i class="fas fa-shield-alt"></i></div>Local Control</h3>
            <p>Devices work locally without cloud dependencies</p>
        </div>
    </div>

.. _who-uses-esphome:

Who Uses ESPHome?
=================

ESPHome is used by a diverse community of smart home enthusiasts, makers, and professionals:

**DIY Enthusiasts**
    Create custom sensors, switches, and displays tailored to specific needs

**Smart Home Hobbyists**
    Extend their home automation systems with affordable custom devices

**Professional Integrators**
    Deploy reliable, locally-controlled smart devices for clients

**Manufacturers**
    Create :doc:`/guides/made_for_esphome` certified products with standardized firmware

.. _getting-started:

Getting Started
===============

Getting started with ESPHome is easy. Choose the method that works best for you:

.. raw:: html

    <div class="getting-started-grid">
        <div class="getting-started-card">
            <h3>From Home Assistant</h3>
            <p>The easiest way to get started with ESPHome is through the Home Assistant add-on.</p>
            <ol>
                <li>Open Home Assistant</li>
                <li>Go to Settings → Add-ons → Add-on Store</li>
                <li>Find and install the ESPHome add-on</li>
                <li>Open the ESPHome Device Builder and create your first device</li>
            </ol>
            <a href="/guides/getting_started_hassio.html" class="btn btn-primary">Detailed Instructions</a>
        </div>
        <div class="getting-started-card">
            <h3>Command Line</h3>
            <p>For advanced users who prefer working with the command line.</p>
            <ol>
                <li>Install Python 3.11 or higher</li>
                <li>Install ESPHome: <code>pip install esphome</code></li>
                <li>Create a configuration file</li>
                <li>Compile and upload: <code>esphome run my_config.yaml</code></li>
            </ol>
            <a href="/guides/getting_started_command_line.html" class="btn btn-primary">Detailed Instructions</a>
        </div>
        <div class="getting-started-card">
            <h3>Ready-Made Projects</h3>
            <p>Start with a pre-configured project for common use cases.</p>
            <ol>
                <li>Browse the project library</li>
                <li>Select a project that matches your hardware</li>
                <li>Follow the installation instructions</li>
                <li>Customize as needed</li>
            </ol>
            <a href="/projects/" class="btn btn-primary">Browse Projects</a>
        </div>
    </div>

Basic Configuration Example
---------------------------

Here's a simple example of an ESPHome configuration file:

.. code-block:: yaml

    # Basic configuration for an ESP32 device
    esphome:
      name: living-room-sensor
      friendly_name: Living Room Sensor

    # Hardware configuration
    esp32:
      board: esp32dev
      framework:
        type: esp-idf

    # Enable Home Assistant API
    api:

    # Enable over-the-air updates
    ota:
      platform: esphome

    # Connect to WiFi
    wifi:
      ssid: !secret wifi_ssid
      password: !secret wifi_password
      
      # Enable fallback hotspot if WiFi connection fails
      ap:

    # Enable web server
    web_server:

    # Add a temperature sensor
    sensor:
      - platform: dht
        pin: GPIO15
        temperature:
          name: "Temperature"
        humidity:
          name: "Humidity"
        update_interval: 60s

.. _using-with-home-assistant:

Using with Home Assistant
=========================

ESPHome and Home Assistant are designed to work together seamlessly, providing a powerful smart home ecosystem.

Automatic Discovery
-------------------

Home Assistant automatically discovers ESPHome devices on your network. When you add a new ESPHome device:

1. Make sure your device is connected to the same network as Home Assistant
2. Home Assistant will show a notification when it discovers the new device
3. Click "Configure" to add it to your system
4. The device and all its entities will appear in your Home Assistant dashboard


Dashboard Integration
---------------------

ESPHome entities appear in Home Assistant just like any other device:

* **Sensors** show up in the appropriate cards and graphs
* **Switches and lights** can be controlled directly
* **Binary sensors** can trigger automations
* **Climate devices** integrate with the thermostat controls

Automations
-----------

You can create powerful automations using ESPHome devices in Home Assistant:

* Use sensor readings to trigger actions
* Control ESPHome devices based on conditions
* Include ESPHome devices in scenes and scripts
* Create complex automations using multiple sensors and conditions.

Advanced Features
-----------------

* **ESPHome Device Builder Add-on**: Manage all your ESPHome devices directly from Home Assistant
* **Backup Integration**: Include ESPHome configurations in your Home Assistant backups
* **Firmware Updates**: Update ESPHome devices directly from the Home Assistant interface

.. raw:: html

    <div class="cta-container">
        <div class="cta-content">
            <h2>Ready to get started?</h2>
            <p>Join thousands of smart home enthusiasts building custom devices with ESPHome</p>
            <div class="cta-buttons">
                <a href="/guides/getting_started_hassio.html" class="btn btn-primary">Installation Guide</a>
                <a href="/components/index.html" class="btn btn-secondary">Browse Components</a>
                <a href="https://devices.esphome.io/" class="btn btn-secondary">Device Database</a>
            </div>
        </div>
    </div>

.. raw:: html

    <h2>Join the Community</h2>
    <div class="community-container">
        <div class="community-links">
            <a href="https://discord.gg/KhAMKrd" class="community-link" target="_blank"
            rel="noopener noreferrer">
                <i class="fab fa-discord"></i>
                <span>Discord</span>
            </a>
            <a href="https://github.com/esphome/esphome" class="community-link" target="_blank"
            rel="noopener noreferrer">
                <i class="fab fa-github"></i>
                <span>GitHub</span>
            </a>
            <a href="https://community.home-assistant.io/c/esphome/" class="community-link" target="_blank"
            rel="noopener noreferrer">
                <i class="far fa-comments"></i>
                <span>Forums</span>
            </a>
            <a href="https://twitter.com/esphome_" class="community-link" target="_blank"
            rel="noopener noreferrer">
                <i class="fab fa-twitter"></i>
                <span>Twitter</span>
            </a>
        </div>
    </div>

.. toctree::
    :hidden:

    web-api/index
    automations/index
    components/index
    cookbook/index
    guides/index
    changelog/index
    images/index
    projects/index

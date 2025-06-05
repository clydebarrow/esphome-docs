ESP32-P4 LDO
============

.. seo::
    :description: Configuration for the ESP32-P4 LDO peripherals for ESPHome.

The ESP32-P4 has 4 Low-Dropout linear regulators that can be used to power on- and off-chip peripherals. This
component allows those regulators to be configured and enabled.


.. code-block:: yaml

    # Example configuration entry
    esp_ldo:
      - channel: 3
        voltage: 2.5V

Configuration variables:
------------------------

- **channel** (**Required**, int): The channel number of the LDO regulator to configure. Only channels 3 and 4 are supported (1 and 2 are used internally by the chip.)
- **voltage** (**Required**, voltage): The desired output voltage - must be in the range 0.5V to 2.7V.
- **adjustable** (*Optional*, bool): If true, the output voltage can be adjusted at run-time.


- :ghedit:`Edit`

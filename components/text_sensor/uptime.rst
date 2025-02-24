Uptime Text Sensor
==================

.. seo::
    :description: Instructions for setting up a text sensor that tracks the uptime of the ESP.
    :image: timer.svg

The ``uptime`` text sensor provides a human-readable representation the time since. The
elements can be separated by a custom string, and more significant elements will be omitted if they are zero. For example,
if the uptime is 1 day, 2 hours, 3 minutes, and 4 seconds, the sensor will report ``1d2h3m4s`` with the default
separator.

.. code-block:: yaml

    # Example configuration entry
    text_sensor:
      - platform: uptime
        name: Uptime

Configuration variables:
------------------------

- **update_interval** (*Optional*, :ref:`config-time`): The sensor reporting interval. Defaults to ``30s``.
- **separator** (*Optional*, string): The separator to use between the uptime values. Defaults to the empty string.
- All other options from :ref:`Text Sensor <config-text_sensor>`.

The resolution of the reported uptime will be determined by the update interval. For example, if the update interval is set to 30 seconds (the default), the uptime will be reported in minutes. More frequent updates will result in seconds being reported.


See Also
--------
- :doc:`/components/sensor/uptime`
- :ref:`text_sensor-filters`
- :apiref:`uptime/uptime_text_sensor.h`
- :ghedit:`Edit`

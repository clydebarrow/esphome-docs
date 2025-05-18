``calibrate_linear``
********************

Calibrate your sensor values by using values you measured with an accurate "truth" source.

Configuration variables:

- **method** (*Optional*, string): The method for calculating the linear function(s).
  One of ``least_squares`` or ``exact``. Defaults to ``least_squares``.
- **datapoints** (**Required**): The list of datapoints.

First, collect a bunch of values of what the sensor shows and what the real value should be.
For temperature, this can for example be achieved by using an accurate thermometer. For other
sensors like power sensor this can be done by connecting a known load and then writing down
the value the sensor shows.

.. code-block:: yaml

    # Example configuration entry
    - platform: dht
      # ...
      temperature:
        name: "DHT22 Temperature"
        filters:
          - calibrate_linear:
             method: least_squares
             datapoints:
              # Map 0.0 (from sensor) to 1.0 (true value)
              - 0.0 -> 1.0
              - 10.0 -> 12.1

The arguments are a list of data points, each in the form ``MEASURED -> TRUTH``. Depending on
the ``method`` ESPHome will then either fit a linear equation to the values (using least squares)
or connect the values exactly using multiple linear equations. You need to supply at least two
values. When using ``least_squares`` and more than two values are given a linear solution will be
calculated and may not represent each value exactly.

.. figure:: images/sensor_filter_calibrate_linear.png
    :align: center
    :width: 50.0%

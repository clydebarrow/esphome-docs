``sliding_window_moving_average``
*********************************

A `simple moving average <https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average>`__
over the last few values. It can be used to have a short update interval on the sensor but only push
out an average on a specific interval (thus increasing resolution).

.. code-block:: yaml

    # Example configuration entry
    - platform: wifi_signal
      # ...
      filters:
        - sliding_window_moving_average:
            window_size: 15
            send_every: 15

Configuration variables:

- **window_size** (*Optional*, int): The number of values over which to perform an
  average when pushing out a value.
- **send_every** (*Optional*, int): How often a sensor value should be pushed out. For
  example, in above configuration the weighted average is only
  pushed out on every 15th received sensor value.
- **send_first_at** (*Optional*, int): By default, the very first raw value on boot is immediately
  published. With this parameter you can specify when the very first value is to be sent.
  Defaults to ``1``.

.. _sensor-filter-exponential_moving_average:


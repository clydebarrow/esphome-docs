``quantile``
************

A `simple moving quantile <https://www.itl.nist.gov/div898/software/dataplot/refman2/auxillar/quantile.htm>`__
over the last few values. This can be used to filter outliers from the received sensor data. A large
window size will make the filter slow to react to input changes.

.. code-block:: yaml

    # Example configuration entry
    - platform: wifi_signal
      # ...
      filters:
        - quantile:
            window_size: 7
            send_every: 4
            send_first_at: 3
            quantile: .9

Configuration variables:

- **window_size** (*Optional*, int): The number of values over which to calculate the quantile
  when pushing out a value.
  Defaults to ``5``.
- **send_every** (*Optional*, int): How often a sensor value should be pushed out. For
  example, in above configuration the quantile is calculated after every 4th
  received sensor value, over the last 7 received values.
  Defaults to ``5``.
- **send_first_at** (*Optional*, int): By default, the very first raw value on boot is immediately
  published. With this parameter you can specify when the very first value is to be sent.
  Must be smaller than or equal to ``send_every``
  Defaults to ``1``.
- **quantile** (*Optional*, float): value from 0 to 1 to determine which quantile to pick.
  Defaults to ``.9``.


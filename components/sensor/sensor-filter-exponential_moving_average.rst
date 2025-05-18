``exponential_moving_average``
******************************

A simple `exponential moving average
<https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average>`__ over the last few
values. It can be used to have a short update interval on the sensor but only push
out an average on a specific interval (thus increasing resolution).

Configuration variables:

- **alpha** (*Optional*, float): The forget factor/alpha value of the filter.
  A higher value includes more details in the output while a lower value removes more noise.
  Defaults to ``0.1``.
- **send_every** (*Optional*, int): How often a sensor value should be pushed out. Defaults to ``15``.
- **send_first_at** (*Optional*, int): By default, the very first raw value on boot is immediately
  published. With this parameter you can specify when the very first value is to be sent.
  Defaults to ``1``.


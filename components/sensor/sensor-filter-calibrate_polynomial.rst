.. _sensor-filter-calibrate_polynomial:

``calibrate_polynomial``
************************

Calibrate your sensor values by fitting them to polynomial functions. This is similar to
the ``calibrate_linear`` filter, but also allows for higher-order functions like quadratic polynomials.

.. code-block:: yaml

    # Example configuration entry
    - platform: adc
      # ...
      filters:
        - calibrate_polynomial:
           degree: 2
           datapoints:
            # Map 0.0 (from sensor) to 0.0 (true value)
            - 0.0 -> 0.0
            - 10.0 -> 12.1
            - 13.0 -> 14.0

The arguments are a list of data points, each in the form ``MEASURED -> TRUTH``. Additionally, you need
to specify the degree of the resulting polynomial, the datapoints will then be fitted to the given
degree with a least squares solver.


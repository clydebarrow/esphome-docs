MIPI DSI Backlight
===================

.. seo::
    :description: Instructions for setting up backlight control on a DSI Display panel
    :image: brightness-medium.svg

The ``mipi_dsi`` light platform creates a simple brightness-only light for a DSI display panel backlight.

.. code-block:: yaml

    # Example configuration entry
    light:
      - platform: mipi_dsi
        id: backlight


See Also
--------

- :doc:`/components/display/mipi_dsi`
- :ghedit:`Edit`

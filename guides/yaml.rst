YAML Format in ESPHome
======================

Overview
--------
ESPHome configuration files use YAML, a human-friendly data serialization standard. This page explains both standard YAML features and ESPHome-specific extensions.

YAML is designed to be human-readable and easy to edit, but can also be frustrating to work with, in particular when it comes to indentation.
YAML is a superset of JSON, and JSON syntax can be used in YAML files.

The order of configuration blocks within an ESPHome YAML file is generally unimportant, as the entire contents will be read before any validation or processing is done.

Standard YAML Features
----------------------

- **Comments:** Any text after a `#` is a comment.
- **Scalars:** Strings, numbers, booleans.
- **Sequences:** Lists of items, using `-` or `[ ... ]`.
- **Mappings:** Key-value pairs, using `key: value` or `{ ... }`.
- **Anchors and Aliases:** Reuse blocks of YAML with `&anchor` and `*alias`.
- **Multi-line Strings:** Use `|` or `>` for multi-line text.

Comments
--------

A YAML comment is any text after a `#` symbol, extending to the end of the line. If you need to include a `#` character in a string, it must appear within quotes.

Scalars
-------
A YAML scalar is any value that doesn't contain a colon (`:`). It can be a string, number, boolean, or null.

Strings are enclosed in double quotes (`"`) or single quotes (`'`). Standard escape sequences such as newline (`\\n`) and Unicode codepoints will be translated inside double quotes only. A string may also be an unquoted character sequence that is not a valid number or boolean, e.g. `23times` will be treated as a string even if not quoted. Strings may also be multi-line, using `|` or `>`.

Boolean values are `true` or `false`, case-insensitive. ESPHome also maps other strings to boolean values:

- `yes`, `on` and  `enable` are mapped to `true`.
- `no`, `off` and `disable` are mapped to `false`.

Numeric values are integers or floating point numbers. Within ESPHome in most situations where a number is expected, it can also be written
as a string containing an integer or a floating point number which will be automatically converted.

Example:

.. code-block:: yaml

    esp8266:
      board: esp8285    # esp8285 is a string
      restore_from_flash: true # boolean value

    web_server:
      port: 80 # integer value

Sequences
---------

A YAML sequence is a list (or array) of items, using `-` or `[ ... ]`. Items can be scalars, sequences, or mappings. The `-` flag is used once per line for a sequence item, while the JSON style using `[ ... ]` can be on a single line, or spread across multiple lines.

Example:

.. code-block:: yaml

    # JSON style
    data_pins: [48, 47, 39, 40]

    # YAML style
    data_pins:
      - 48
      - 47
      - 39
      - 40


    sensors:
    # A list of sensors, each is a mapping
      - platform: gpio
        name: "Temperature 1"
        pin: GPIO32

      - platform: gpio
        name: "Temperature 2"
        pin: GPIO33


Sequences in YAML format can be quite confusing at times - consider the following examples:

.. code-block:: yaml

    - platform: gpio
      name: "Temperature 1"

    - label:
        text: "Temperature 1"

It may seem odd that in the first case there is no additional indentation, while in the second case there is. The difference is that in the first case the sequence item is itself a mapping, with keys `platform` and `name`, while in the second case the sequence item is a key `label` with a value of a mapping with key `text` and value `"Temperature 1"`. Rewriting these in JSON format can make it clearer:

.. code-block:: json

    - {
        "platform": "gpio",
        "name": "Temperature 1"
      }
    - {
        "label": {
          "text": "Temperature 1"
        }
      }

A useful rule of thumb is that wherever there is a sequence item that ends with a colon, it will require further indentation for the subsequent lines, so this example is wrong and will throw two errors:

.. code-block:: yaml

    - label: # Will throw an error "expected a dictionary"
      text: "Temperature 1"  # Wrong! Should be indented. Will throw error "text is an invalid option for ..."

Mappings
--------

A YAML mapping is a key-value pair, using `key: value` or `{ ... }`. Keys can be any valid YAML scalar (though usually they will be confined to strings from a predefined set), while values can be any valid YAML scalar, list, or mapping. A mapping can also be referred to as a dictionary, associative array or hashtable. The keys used in a single mapping must all be unique.

Example:

.. code-block:: yaml

    sensor:
      platform: gpio
      pin: GPIO32
      name: "Temperature 1"
      device_class: temperature
      unit_of_measurement: "°C"
      accuracy_decimals: 1
      state_class: measurement

In the example above "sensor" is a key in a mapping, and its value is another mapping. The second mapping has keys `platform`, `pin`, `name`, `device_class`, `unit_of_measurement`, `accuracy_decimals` and `state_class`.

Where a mapping value is a sequence it should be indented after the key, but this is one of the few places that YAML is forgiving of incorrect indentation, e.g.

.. code-block:: yaml

    widgets:
    - label:
        text: Temperature 1
    - label:
        text: Temperature 2

Note that the sequence marker `-` is *not* indented below the mapping key `widgets`. This technically incorrect, but will be interpreted correctly by the YAML parser. It is recommended that you stick to the correct format, but if you see this used in a YAML file, understand that it does work - and it can be useful when the depth of indentation gets deep.


Anchors, Aliases, and Overriding Values
---------------------------------------

YAML anchors (`&anchor`) and aliases (`*alias`) allow you to define a block of configuration once and reuse it elsewhere. This is especially useful for repeating metadata fields.
You can also override specific values when merging with `<<: *anchor`:

.. code-block:: yaml

    sensor:
      - &common_adc
          pin: GPIO32
          platform: adc
          name: "Temperature 1"
          device_class: temperature
          unit_of_measurement: "°C"
          accuracy_decimals: 1
          state_class: measurement

      - <<: *common_adc
        pin: GPIO33
        name: "Temperature 2"

In this example, both sensors share the metadata from `common_adc`, but the second sensor overrides the `pin` and `name` values.

ESPHome YAML Extensions
-----------------------

ESPHome adds several powerful features to standard YAML:

Secrets and the secrets.yaml File
---------------------------------

The `!secret` tag allows you to reference sensitive values (like passwords or API keys) stored in a separate `secrets.yaml` file.
This is especially helpful when you want to be able to distribute your configuration files without revealing your secrets.

**Important:** Your `secrets.yaml` file should NOT be checked into git or any other version control system to keep your secrets safe.

Example:

.. code-block:: yaml

    wifi:
      ssid: "MyWiFi"
      password: !secret wifi_password

And in your `secrets.yaml` (not in version control):

.. code-block:: yaml

    wifi_password: my_super_secret_password

Substitutions
-------------

The ``substitutions:`` feature allows you to define reusable values that can be referenced throughout your configuration. This is especially useful for:

- Making your configuration more readable and maintainable
- Avoiding repetition of common values
- Creating templates that can be reused across multiple devices

**Basic Usage:**

.. code-block:: yaml

    substitutions:
      device_name: living_room_light
      friendly_name: Living Room Light
      update_interval: 60s

    esphome:
      name: $device_name
      friendly_name: $friendly_name

    sensor:
      - platform: dht
        model: DHT22
        pin: D2
        temperature:
          name: "${friendly_name} Temperature"
          id: ${device_name}_temperature
        humidity:
          name: "${friendly_name} Humidity"
        update_interval: ${update_interval}

**Key Features:**

- Values are referenced using ``$variable_name`` or ``${variable_name}`` syntax
- The ``${variable_name}`` syntax is required when embedding within other text
- Substitutions are processed before any other part of the configuration
- Substitutions values must be strings. Numbers and booleans are not supported, but in most cases a number represented as a string will be automatically converted when substituted.

!include
--------

- Insert the contents of another YAML file at this position.
- Useful for splitting configurations into reusable parts.
- Substitutions can be used in the included file to reference values passed to ``!include``. Such values will override any global substitutions, so global substitutions can be used to provide default values.

  Example:

  .. code-block:: yaml

    binary_sensor:
      - platform: gpio
        id: button1
        pin: GPIOXX
        on_multi_click: !include { file: on-multi-click.yaml, vars: { id: 1 } } # inline syntax
      - platform: gpio
        id: button2
        pin: GPIOXX
        on_multi_click: !include
          # multi-line syntax
          file: on-multi-click.yaml
          vars:
            id: 2

Packages
--------

The ``packages`` feature allows you to define reusable and potentially partial configurations that can be included in your main configuration. Including a package file will merge its contents with your main configuration in a non-destructive way.

Example:

.. code-block:: yaml

    # main file contents

    packages:
      wifi: !include common/wifi.yaml
      living_room: !include common/packages/living_room.yaml

    wifi:
      ssid: "MyActualWiFi" # overrides the value in common/wifi.yaml

    # The contents of common/wifi.yaml

    wifi:
      ssid: "MyWiFi"
      password: !secret wifi_password

Note that the key in a packages line is just a placeholder - it must be unique within the `packages` mapping, and should ideally be chosen to indicate its purpose, but otherwise can be anything you like that is a valid key.

Variable can be provided for substitutions when including a package file, just as for regular includes.

The `packages:` key can only appear at the root level of the YAML file, i.e. it must start in column 1. Its location within the file is however not important. Files included under a `packages:` key will be inserted at the root level of the file, so the contents of the file should look like fragments of a standard configuration. This is in contrast to regular includes, which are inserted at the same level as the `!include` key.

See Also
---------------

- :doc:`/guides/configuration-types`
- `YAML Official Site <https://yaml.org/>`_

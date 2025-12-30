---
description: "Instructions for integrating Amber Electric API with ESPHome"
title: "Amber Electric API"
params:
  seo:
    description: Instructions for integrating Amber Electric API with ESPHome
    image: connection.svg
---

The `amber_api` component allows you to integrate [Amber Electric](https://www.amber.com.au/) electricity pricing data into your ESPHome devices. Amber Electric is an Australian electricity retailer that provides wholesale electricity pricing passed directly to customers.

This component polls the Amber Electric API to retrieve:

- Current and forecast electricity purchase prices (general usage)
- Current and forecast feed-in tariff prices (solar export)
- Price spike status
- Price descriptors (e.g., "extremelyLow", "high", "spike")

```yaml
# Example configuration entry
http_request:
  id: http_request_component

amber_api:
  id: amber_component
  api_key: !secret amber_api_key
  site_id: !secret amber_site_id
  http_request_id: http_request_component
  update_interval: 5min
  on_update:
    - logger.log: "Amber pricing data updated"

sensor:
  - platform: amber_api
    amber_api_id: amber_component
    type: general
    name: "Electricity Price"

binary_sensor:
  - platform: amber_api
    amber_api_id: amber_component
    name: "Price Spike"

text_sensor:
  - platform: amber_api
    amber_api_id: amber_component
    name: "Price Descriptor"
```

{{< anchor "amber_api-configuration_variables" >}}

## Configuration variables

- **api_key** (**Required**, string): Your Amber Electric API key. You can obtain this from the [Amber Electric API Portal](https://app.amber.com.au/developers/api).
- **site_id** (**Required**, string): Your Amber Electric site ID.
- **http_request_id** (**Required**, [ID](/guides/configuration-types#id)): ID of the {{< docref "http_request" >}} component to use for API requests.
- **id** (*Optional*, [ID](/guides/configuration-types#id)): Manually specify the ID used for code generation.
- **update_interval** (*Optional*, [Time](/guides/configuration-types#time)): The interval to poll the API. Defaults to `5min`. Note that Amber updates pricing data every 5 minutes, so more frequent polling may not yield new data.

{{< anchor "amber_api-triggers" >}}

## Triggers

### `on_update` Trigger

This automation will be triggered after the component successfully retrieves and parses new data from the Amber API.

```yaml
amber_api:
  # ...
  on_update:
    - logger.log: "New pricing data available"
    - if:
        condition:
          lambda: 'return id(electricity_price).state < 0;'
        then:
          - logger.log: "Negative pricing - great time for heavy loads!"
```

{{< anchor "amber_api-sensor" >}}

## Sensor

The `amber_api` sensor platform exposes electricity pricing data as numeric sensors.

```yaml
sensor:
  - platform: amber_api
    amber_api_id: amber_component
    type: general
    name: "Current Electricity Price"
    accuracy_decimals: 4

  - platform: amber_api
    amber_api_id: amber_component
    type: general_forecast
    name: "Forecast Electricity Price"

  - platform: amber_api
    amber_api_id: amber_component
    type: feedin
    name: "Solar Feed-in Price"

  - platform: amber_api
    amber_api_id: amber_component
    type: feedin_forecast
    name: "Solar Feed-in Forecast"
```

### Configuration variables

- **amber_api_id** (**Required**, [ID](/guides/configuration-types#id)): The ID of the amber_api component.
- **type** (**Required**, enum): The type of price data to expose. One of:
  - `general` - Current electricity purchase price (includes network charges)
  - `general_forecast` - Forecast purchase price for the next 5-minute interval
  - `feedin` - Current solar feed-in tariff (wholesale spot price)
  - `feedin_forecast` - Forecast feed-in tariff for the next 5-minute interval
- All other options from [Sensor](/components/sensor).

All prices are in Australian dollars per kilowatt-hour ($/kWh).

{{< anchor "amber_api-binary_sensor" >}}

## Binary Sensor

The `amber_api` binary sensor platform exposes the price spike status.

```yaml
binary_sensor:
  - platform: amber_api
    amber_api_id: amber_component
    name: "Price Spike"
    device_class: problem
```

### Configuration variables

- **amber_api_id** (**Required**, [ID](/guides/configuration-types#id)): The ID of the amber_api component.
- All other options from [Binary Sensor](/components/binary_sensor).

The binary sensor is `ON` when the spike status from the API is "spike", and `OFF` otherwise (including "none" and "potential" states).

{{< anchor "amber_api-text_sensor" >}}

## Text Sensor

The `amber_api` text sensor platform exposes the price descriptor.

```yaml
text_sensor:
  - platform: amber_api
    amber_api_id: amber_component
    name: "Price Descriptor"
```

### Configuration variables

- **amber_api_id** (**Required**, [ID](/guides/configuration-types#id)): The ID of the amber_api component.
- All other options from [Text Sensor](/components/text_sensor).

Possible descriptor values:

- `extremelyLow`
- `veryLow`
- `low`
- `neutral`
- `high`
- `spike`

{{< anchor "amber_api-examples" >}}

## Examples

### Complete configuration with automations

```yaml
http_request:
  id: http_request_component
  useragent: esphome/amber-monitor
  timeout: 10s

amber_api:
  id: amber_component
  api_key: !secret amber_api_key
  site_id: !secret amber_site_id
  http_request_id: http_request_component
  update_interval: 5min
  on_update:
    - logger.log: "Amber pricing updated"

sensor:
  - platform: amber_api
    amber_api_id: amber_component
    type: general
    name: "Electricity Price"
    id: electricity_price
    icon: "mdi:currency-usd"

  - platform: amber_api
    amber_api_id: amber_component
    type: feedin
    name: "Solar Feed-in Price"
    id: feedin_price
    icon: "mdi:solar-power"

  # Create a template sensor for cheap electricity periods
  - platform: template
    name: "Electricity Price Status"
    lambda: |-
      if (id(electricity_price).state < 0) {
        return -1;  // Negative pricing
      } else if (id(electricity_price).state < 0.10) {
        return 0;   // Cheap
      } else if (id(electricity_price).state < 0.25) {
        return 1;   // Normal
      } else {
        return 2;   // Expensive
      }

binary_sensor:
  - platform: amber_api
    amber_api_id: amber_component
    name: "Price Spike"
    id: price_spike
    device_class: problem

text_sensor:
  - platform: amber_api
    amber_api_id: amber_component
    name: "Price Descriptor"
    id: price_descriptor

switch:
  - platform: template
    name: "Hot Water Heater"
    id: hot_water_heater
    optimistic: true

# Automation: Enable hot water heater during cheap electricity
interval:
  - interval: 1min
    then:
      - if:
          condition:
            lambda: 'return id(electricity_price).state < 0.05;'
          then:
            - switch.turn_on: hot_water_heater
          else:
            - if:
                condition:
                  lambda: 'return id(electricity_price).state > 0.20;'
                then:
                  - switch.turn_off: hot_water_heater
```

### Using in lambdas

You can access the Amber data from C++ lambdas:

```yaml
lambda: |-
  auto amber = id(amber_component);
  float current_price = amber->get_general_price();
  float forecast = amber->get_general_forecast_price();
  std::string spike = amber->get_spike_status();
  
  ESP_LOGD("main", "Current price: %.4f $/kWh", current_price);
  ESP_LOGD("main", "Spike status: %s", spike.c_str());
```

## Notes

- You need an Amber Electric account and API key to use this component
- The API is rate-limited, so avoid setting `update_interval` too low (5 minutes is recommended)
- Prices are updated by Amber every 5 minutes
- General usage prices include network charges, while feed-in uses the wholesale spot price
- All prices are in Australian dollars per kilowatt-hour ($/kWh)
- The component requires the {{< docref "http_request" >}} component to be configured

## See Also

- {{< docref "http_request" >}}
- {{< docref "sensor" >}}
- {{< docref "binary_sensor" >}}
- {{< docref "text_sensor" >}}
- [Amber Electric](https://www.amber.com.au/)
- [Amber Electric API Documentation](https://app.amber.com.au/developers/documentation)
- {{< apiref "amber_api/amber_api.h" "amber_api/amber_api.h" >}}

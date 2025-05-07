``debounce``
************

Only send values if the last incoming value is at least ``specified time period``
old. For example if two values come in at almost the same time, this filter will only output
the last value and only after the specified time period has passed without any new incoming
values.


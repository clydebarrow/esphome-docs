``throttle_average``
********************

An average over the ``specified time period``, potentially throttling incoming values. When this filter gets incoming values, it sums up all values and pushes out the average after the ``specified time period`` passed. There are two edge cases to consider within the ``specified time period``:

* no value(s) received: ``NaN`` is returned - add the ``heartbeat`` filter if periodical pushes are required and/or ``filter_out: nan`` if required
* one value received: the value is pushed out after the ``specified time period`` passed, without calculating an average

For example a ``throttle_average: 60s`` will push out a value every 60 seconds, in case at least one sensor value is received within these 60 seconds.

In comparison to the ``throttle`` filter, it won't discard any values. In comparison to the ``sliding_window_moving_average`` filter, it supports variable sensor reporting rates without influencing the filter reporting interval (except for the first edge case).


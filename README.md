node-red-contrib-mock
=====================

Node that records and replays message payload. Useful for testing.

- When message is received by node, it stores (records) the payload.
- When you click on the node button, stored message payload is sent (replayed) to next node.

*NOTE:* Stored (recorded) payload is reset when node is redeployed. If you want to keep the stored payload, deploy only nodes which you have changed.

Install
-------
Run command on Node-RED installation directory

	npm install node-red-contrib-mock
	

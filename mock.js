module.exports = function (RED) {
    function NodeMock(config) {
        RED.nodes.createNode(this, config);

        const node = this;

        node.name = config.name;

        node.status({fill: 'green', shape: 'ring', text: 'empty'});

        this.on('input', function (msg) {
            if (msg.mocked && msg.mocked === true) {
                msg.payload = node.context.memory;

                node.send(msg);
            } else {
                node.context.memory = msg.payload;

                const contentDescription = node.context.memory.toString().substring(0, 32);
                node.status({fill: 'green', shape: 'dot', text: contentDescription});

                node.send(msg);
            }
        });

    }

    RED.nodes.registerType('mock', NodeMock);

    RED.httpAdmin.post('/mock/:id', RED.auth.needsPermission('mock.write'), function (req, res) {
        const node = RED.nodes.getNode(req.params.id);
        if (node == null) {
            res.sendStatus(404);
        } else {
            try {
                node.receive({mocked: true});
                res.sendStatus(200);
            } catch (err) {
                res.sendStatus(500);
                node.error(RED._("mock.failed", {error: err.toString()}));
            }
        }
    });

};

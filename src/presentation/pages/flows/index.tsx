import { CanvasWidget } from '@projectstorm/react-canvas-core';
import createEngine, { DefaultDiagramState, DefaultLinkModel, DefaultNodeModel, DiagramModel } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { memo } from 'react';
import DemoCanvasWidget from './demoCanvasWidget';
import style from './index.module.css';

const Flows: React.FC = () => {
    //1) setup the diagram engine
    var engine = createEngine();

    // ############################################ MAGIC HAPPENS HERE
    const state = engine.getStateMachine().getCurrentState();
    if (state instanceof DefaultDiagramState) {
        state.dragNewLink.config.allowLooseLinks = false;
    }
    // ############################################ MAGIC HAPPENS HERE

    //2) setup the diagram model
    var model = new DiagramModel();

    //3-A) create a default node
    var start = new DefaultNodeModel({ name: 'Início', color: 'rgb(0,192,255)' });
    var port1 = start.addOutPort('Out');
    start.setPosition(10, 350);

    //3-B) create another default node
    var node2 = new DefaultNodeModel({ name: 'Node 2', color: 'rgb(192,255,0)' });
    var port2 = node2.addInPort('In');
    node2.setPosition(200, 300);

    //3-C) link the 2 nodes together
    var link1 = port1.link<DefaultLinkModel>(port2);
    link1.addLabel('testLink');

    //3-D) create an orphaned node
    var node3 = new DefaultNodeModel({ name: 'Node 3', color: 'rgb(0,192,255)' });
    var port3 = node3.addOutPort('In');
    node3.setPosition(200, 400);

    var link2 = port1.link<DefaultLinkModel>(port3);
    link2.addLabel('testLink2');

    //4) add the models to the root graph
    model.addAll(start, node2, node3, link1, link2);

    //5) load model into engine
    engine.setModel(model);

    //6) render the diagram!
    return (
        <div className={style.boxFlows}>
            <DemoCanvasWidget background='white'>
                <CanvasWidget engine={engine} />
            </DemoCanvasWidget>
        </div>
    );
};

export default memo(Flows);
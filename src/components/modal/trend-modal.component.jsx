import React from "react";
import {Button, Modal} from "reactstrap";

/**
 * The TrendModal component is for showing the trend image for the query trend analysis in the embedding mode
 * NOTICE: The img src part can be diffferent among various results
 * @param {*} props 
 */
function TrendModal(props) {
    const [liveDemo,
        setLiveDemo] = React.useState(false);
    return (
        <div>
            <Button color="primary" type="button" onClick={() => setLiveDemo(true)}>
                View Search Trend for this embedding query
            </Button>
            <Modal isOpen={liveDemo} toggle={() => setLiveDemo(false)}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLiveLabel">
                        {props.title}
                    </h5>
                </div>
                <div className="modal-body">
                    <img style={{maxWidth: '100%'}} src={require('../../assets/img/trend_test.jpg')} alt=''/>
                </div>
            </Modal>
        </div>
    );
}

export default TrendModal;
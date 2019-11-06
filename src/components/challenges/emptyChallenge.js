import React from 'react';

const EmptyChallenge = (props) => {
    let content = "";
    if (props.count < 1) {
        content = <div className="col-md-4">
            <div className="shell-empty">
            </div>
        </div>
    }
    return content;
}

export default EmptyChallenge;
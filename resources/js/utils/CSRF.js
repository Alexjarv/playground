import React from 'react';

function CSRF() {

    const _token = document.querySelector('meta[name="csrf-token"]').content;

    return (
        <input type="hidden" name="_token" value={_token} wfd-invisible="true"></input>
    );
}

export default CSRF;


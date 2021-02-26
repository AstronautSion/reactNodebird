import React from 'react';

const Hashtag = () => {
    return (
        <>Hashtag</>
    )
}

Hashtag.getInitialProps = async (context) => {
    console.log('context.query.tag ****',context.query.tag)
}

export default Hashtag;
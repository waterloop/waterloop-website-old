import React, { Component } from 'react';
import './Footer.css';
import AppBar from 'material-ui/AppBar';

const styles = {
    title: {
        paddingLeft: '200px',
        paddingRight: '300px',
        paddingTop: '0px',
        paddingBottom: '0px',
        backgroundColor: '#FAFAFA',
        boxShadow: 'none',
    },
    titleLeft: {
        margin: "0px",
    },
    button: {
        height: '64px',
    },
    labelStyle: {
        fontSize: '13px',
        opacity: '0.6',
        textTransform: 'capitalize',
        fontWeight: '400',
    },
    labelStyleBold: {
        fontSize: '13px',
        textTransform: 'capitalize',
        fontWight: 'none',
    }
};

function footerLinks(){
    var leftCol =     [
        {
            name: "Our Team",
            link: ""
        },
        {
            name: "Terms & Conditions",
            link: "google.com"
        },
        {
            name: "Privacy Policy",
            link: ""
        },
        {
            name: "Project Protection",
            link: ""
        },
        {
            name: "FAQs",
            link: ""
        },
    ];
    var rightCol = [
        {
            name: "Email",
            link: ""
        },
        {
            name: "Twitter",
            link: ""
        },
        {
            name: "Facebook",
            link: ""
        },
        {
            name: "Instagram",
            link: ""
        },
        {
            name: "Medium",
            link: ""
        },
    ];

    var leftHtml = [];
    var rightHtml = [];
    for(let leftElem = 0; leftElem < leftCol.length ; leftElem++){
        leftHtml.push(<div key={leftElem} className="footerElement"><a className="footerLink" href={leftCol[leftElem].link}>{leftCol[leftElem].name}</a></div>);
    }
    for(let rightElem = 0; rightElem < rightCol.length ; rightElem++){
        rightHtml.push(<div key={rightElem+leftCol.length} className="footerElement"><a className="footerLink" href={rightCol[rightElem].link}>{rightCol[rightElem].name}</a></div>);
    }
    return(
        <div className="footerTable">
            <span className="footerColumn">
                {leftHtml}
            </span>
            <span className="footerColumn">
                {rightHtml}
            </span>
        </div>
    );
}


class Footer extends Component {
  render() {
    return (
        <div className="Footer">
            <div className="horizontalRuler"></div>					
            <AppBar
                style = {styles.title}
                iconStyleLeft={styles.titleLeft}
                iconStyleRight={styles.titleRight}
                iconElementLeft={
                    <span>
                        <span className="logo"></span>                        
                    </span>
                }
                iconElementRight={
                    footerLinks()
                }
            />
        </div>
    );
  }
}

export default Footer;
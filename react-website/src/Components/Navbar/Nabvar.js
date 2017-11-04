import React, { Component } from 'react';
import './Navbar.css';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';

const styles = {
    title: {
        paddingLeft: '200px',
        paddingRight: '200px',
        paddingTop: '0px',
        paddingBottom: '0px',
        backgroundColor: '#FAFAFA',
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

class Navbar extends Component {
  render() {
    return (
        <div className="Navbar">
            <AppBar
                style = {styles.title}
                iconStyleLeft={styles.titleLeft}
                iconStyleRight={styles.titleLeft}
                iconElementLeft={
                    <span>
                        <FlatButton labelStyle={styles.labelStyle} style={styles.button} label="Home" />
                        <FlatButton labelStyle={styles.labelStyle} style={styles.button} label="Flock" />
                        <FlatButton labelStyle={styles.labelStyle} style={styles.button} label="Team" />
                        <FlatButton labelStyle={styles.labelStyle} style={styles.button} label="Media" />
                        <FlatButton labelStyle={styles.labelStyle} style={styles.button} label="Sponsors" />
                        <FlatButton labelStyle={styles.labelStyle} style={styles.button} label="Downloads" />
                    </span>
                }
                iconElementRight={
                    <span>
                        <FlatButton labelStyle={styles.labelStyle} style={styles.button} label="Shop" />
                        <FlatButton labelStyle={styles.labelStyleBold} style={styles.button} label="Contact" />
                    </span>
                }
            />
        </div>
    );
  }
}

export default Navbar;
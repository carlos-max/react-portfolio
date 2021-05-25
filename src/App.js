import React, { Component } from "react";
import $ from "jquery";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Resume from "./Components/Resume";

class App extends Component {
  constructor(props) {
    super(props);
    this.changeLocale = this.changeLocale.bind(this);
    this.state = {
      locale: "US",
      resumeData: {}
    };

    /*TODO IMPLEMENTAR GA
    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);*/
  }

  getResumeData() {
    $.ajax({
      url: "./resumeData"+this.state.locale+".json",
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount() {
    this.getResumeData();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.locale !== this.state.locale && this.state.locale) {
      this.getResumeData();
    }
  }

  changeLocale(value) {
    this.setState({locale: value});
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main} locale={this.state.locale} changeLocale={this.changeLocale} />
        <About data={this.state.resumeData.main} />
        <Resume data={this.state.resumeData.resume} />        
        <Footer data={this.state.resumeData.main} />
      </div>
    );
  }
}

export default App;

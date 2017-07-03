const API_KEY = '5cc1f25759881907aed6171543839b19';

function getWeather() {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?id=6167865&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(reshapeData);
}

function reshapeData() {

}

class Weather extends React.Component {
  render() {
    return (
      <div className="bw2 ba blue dib pa3 bg-washed-blue">

      <div className="flex items-stretch mb2">
        <img src={this.props.icon} />

        <header className="ml3">
          <h1 className="f7 ttu tracked mt0 mb2 flex-auto dark-blue">Toronto</h1>
          <p className="f3 mv0">{this.props.temp} ℃</p>
        </header>
      </div>

      <p className="mv0 f5 ttc">{this.props.description}</p>
      </div>
    )
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: 14.85,
      description: "proximity shower rain",
      icon: "http://openweathermap.org/img/w/10d.png",
    }
  }
  render() {
    return (
      <Weather
        temp={this.state.temp}
        description={this.state.description}
        icon={this.state.icon}
      />
    )
  }
};


ReactDOM.render(<App />, document.getElementById('exercise'));

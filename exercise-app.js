const API_KEY = '498beb84557a3e0a4b7b519c6c1134fa';

function getWeather() {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?id=6167865&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(reshapeData);
}

function reshapeData(data) {
  ReactDOM.render(<Weather {...data} />,
  document.getElementById('exercise'));
  return data;
}

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: props.main.temp,
      description: props.weather[0].description,
      icon: `http://openweathermap.org/img/w/${props.weather[0].icon}.png`,
    };
  }

  componentDidMount() {
    setInterval(
      () => this.updateWeather(),
      15000
    );
  }

  updateWeather() {
    getWeather();
  }

  render() {
    return (
    <div className="bw2 ba blue dib pa3 bg-washed-blue">

      <div className="flex items-stretch mb2">
        <img src={this.state.icon} />

        <header className="ml3">
          <h1 className="f7 ttu tracked mt0 mb2 flex-auto dark-blue">Toronto</h1>
          <p className="f3 mv0">{ this.state.temp } ℃</p>
        </header>
      </div>

      <p className="mv0 f5 ttc">{ this.state.description }</p>
    </div>
    )
  }
}

var App = React.createClass({
  getInitialState: function() {
    return {
      data: getWeather(),
    }
  },
  render: function() {
    return (
      <Weather />
      )
  },
});

ReactDOM.render(<App />, document.getElementById('exercise'));
const API_KEY = '5cc1f25759881907aed6171543839b19';

function getWeather() {
  console.log('getWeather is being called');
  return fetch(`http://api.openweathermap.org/data/2.5/weather?id=6167865&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(reshapeData);
}

function reshapeData(data) {
  return {
    temp: data.main.temp,
    description: data.weather[0].description,
    icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
  };
}

//somewhere, setTimeout and then call getWeather

const Weather = ({ temp, description, icon }) => (
  <div className="bw2 ba blue dib pa3 bg-washed-blue">

    <div className="flex items-stretch mb2">
      <img src={icon} />

      <header className="ml3">
        <h1 className="f7 ttu tracked mt0 mb2 flex-auto dark-blue">Toronto</h1>
        <p className="f3 mv0">{ temp } ℃</p>
      </header>
    </div>

    <p className="mv0 f5 ttc">{ description }</p>
  </div>
);


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
    };
  }

  refreshWeatherState() {
    getWeather()
      .then(data => this.setState({ data }));
  }

  componentDidMount() {
    this.refreshWeatherState();

    setInterval(this.refreshWeatherState.bind(this), 15000);
  }

  render() {
    if (this.state.data == null) {
      return null;
    }

    return (
      <Weather
        temp={this.state.data.temp}
        description={this.state.data.description}
        icon={this.state.data.icon}
      />
    );
  };
};

ReactDOM.render(<App />, document.getElementById('exercise'));

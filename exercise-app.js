const API_KEY = 'cbde950e8a9a0ff5f7039bc0a8abbe59';

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
      temp: 19,
      description: "proximity shower rain",
      icon: "http://openweathermap.org/img/w/10d.png",
    }
  }

  componentDidMount () {
    setInterval(() => {
      this.getWeather()
    }, 15000);
  }

  getWeather = () => {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?id=6167865&appid=${API_KEY}&units=metric`)
      .then(res => {
        if(!res.ok) {
          throw 'An error occurred!';
        }
        return res.json();
      })
      .then((data) => {
        let reshapedData = this.reshapeData(data);
        this.setState({
          temp: reshapedData.temp,
          description: reshapedData.description,
          icon: reshapedData.icon,
        });
      })
      .catch(error => console.error(error));
  }

  reshapeData = (data) => {
    let newData = {
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    };
    return newData;
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

const API_KEY = 'c670b18d8b550029efd22107efe00b2b';

class WeatherContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temp : null,
      description: null,
      icon: null
    }
  }

  componentDidMount() {
    this.getWeather()
    this.startTimer()
  }

startTimer() {
  setInterval(() => this.getWeather(), 15000)
}

getWeather() {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?id=6167865&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(weatherData => this.reshapeData(weatherData));
}

reshapeData(weatherData) {
  this.setState({temp: weatherData.main.temp, description: weatherData.weather[0].description, icon: icon(weatherData.weather[0].icon)})
}

render() {
    return (
        <Weather temp={this.state.temp} 
        description={this.state.description} 
        icon={this.state.icon}/>
      )
  }
}

function icon(name) {
  return `http://openweathermap.org/img/w/${name}.png`
} 

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

ReactDOM.render(<WeatherContainer />, document.getElementById('exercise'));

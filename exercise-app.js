const API_KEY = '90ee61380f9b14c81f307d3fb6191157';

function getWeather() {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?id=6167865&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(reshapeData);
}

function reshapeData(data) {
  return {
    temp: data.main.temp,
    description: data.weather[0].description,
    icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
  }
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

class WeatherWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      temp : '',
      description: '',
      icon: ''
   }

   this.updateWeatherData = this.updateWeatherData.bind(this);

  };
    
  updateWeatherData (){
    getWeather().then(response => this.setState(
      {
        temp: response.temp,
        description: response.description,
        icon: response.icon
      }
    ));
  }

  componentDidMount() {
    this.updateWeatherData();
    setInterval(() => this.updateWeatherData(), 150000);
   };

render() {
   return (
     <Weather
         temp={this.state.temp}
         description={this.state.description}
         icon={this.state.icon}
       />
    );
  }
}

const App = (props) => (
  <WeatherWidget />
);
 
ReactDOM.render(<App />, document.getElementById('exercise'));

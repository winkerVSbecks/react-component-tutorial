const API_KEY = '84ad1fab102a4f3d506e9777a1e6d51d';

function getWeather() {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?id=6167865&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(reshapeData)
}

function reshapeData(data) {
    return {
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    };
}

const Weather = ({temp, description, icon}) => (
    <div className="bw2 ba blue dib pa3 bg-washed-blue">
        <div className="flex items-stretch mb2">
            <img src={icon}/>
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
            icon: '',
            temp: '',
            description: '',
        }
    }

    componentDidMount() {
       getWeather().then(response => this.setState(response));
    }

    render() {
        const { icon, temp, description} = this.state;
        return (
            <Weather
                temp={temp}
                description={description}
                icon={icon}
            />
        );
    }
}

ReactDOM.render(<App />, document.getElementById('exercise'));
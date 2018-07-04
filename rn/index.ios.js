import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
    ActivityIndicator,
} from 'react-native';

const REQUEST_URL = 'https://free-api.heweather.com/s6/weather/now?key=510145b92aed4e9386f161fcba12546d&';
export default class NativeRNApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, //网络请求状态
            error: false,
            errorInfo: "",
            weatherTitle: this.props.cityName,
            weatherContent: [],
            isRefreshing:false,//下拉控制
        }
    }

    //网络请求
    fetchData(cityName) {
        //这个是js的访问网络的方法
        fetch(REQUEST_URL+'location='+cityName)
            .then((response) => response.json())
            .then((responseData) => {

                console.log("sucess",responseData.HeWeather6[0])

                this.setState({
                    //复制数据源
                    weatherTitle: responseData.HeWeather6[0].basic.location,
                    weatherContent: responseData.HeWeather6[0].now,
                    isLoading: false,
                    isRefreshing:false,
                });

                console.log("sucess",this.state.weatherContent)

            })
            .catch((error) => {
                this.setState({
                    error: true,
                    errorInfo: error
                })
            })
            .done();
    }

    componentDidMount() {
        //请求数据
        this.fetchData(this.state.weatherTitle);
    }

    //加载等待页
    renderLoadingView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    color='red'
                    size="large"
                />
            </View>
        );
    }

    //加载失败view
    renderErrorView() {
        return (
            <View style={styles.container}>
                <Text>
                    请检查地名输入，输入例子：北京、天津、beijing、tianjing 等
                </Text>
            </View>
        );
    }


    renderData() {
        return (

            <View style = {{flex: 1, backgroundColor: 'gray'}}>
                {this.renderHead()}
                {this.renderContent()}
            </View>
        );
    }

    render() {
        //第一次加载等待的view
        if (this.state.isLoading && !this.state.error) {
            return this.renderLoadingView();
        } else if (this.state.error) {
            //请求失败view
            return this.renderErrorView();
        }
        //请求成功
        return this.renderData();
    }

    renderHead() {
        return (
            <View style = {styles.headViewStyle}>
                <Text style={styles.title}>
                    天气预报
                </Text>

            </View>
        )
    }

    renderContent() {
        return (
            <View style={styles.contentStyle}>
                <Text style={styles.content}>
                    {this.state.weatherTitle}
                </Text>
                <Text style={styles.content}> cloud: {this.state.weatherContent.cloud}</Text>
                <Text style={styles.content}> cond_code: {this.state.weatherContent.cond_code}</Text>
                <Text style={styles.content}> cond_txt: {this.state.weatherContent.cond_txt}</Text>
                <Text style={styles.content}> tmp: {this.state.weatherContent.tmp}</Text>
                <Text style={styles.content}> wind_dir: {this.state.weatherContent.wind_dir}</Text>
                <Text style={styles.content}> wind_spd: {this.state.weatherContent.wind_spd}</Text>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        flex: 1,
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    content: {
        flex: 1,
        fontSize: 20,
        color: 'black',
    },
    contentStyle: {
        marginTop: 20,
        flexDirection :'column',
        height: 400,
        backgroundColor: 'white',
        alignItems:'center'
    },
    headViewStyle: {
        marginTop: 100,
        flexDirection :'row',
        height: 60,
        backgroundColor: 'white',
        alignItems:'center'
    },
});

AppRegistry.registerComponent('RNDemo', () => NativeRNApp);
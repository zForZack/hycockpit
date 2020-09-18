import axios from "axios";

// get请求
const get = (url, params, headers) => {
	return new Promise(function(resolve, reject) {
		axios({
			url: url,
			method: 'get',
			params: params,
			headers: headers
		}).then((data) => {
			resolve(data.data);
		})
	});
}

// post请求
const post = (url, params, headers) => {
	return new Promise(function(resolve, reject) {
		axios({
			url: url,
			method: 'post',
			params: params,
			headers: headers
		}).then((data) => {
			resolve(data.data);
		})
	});
}

export default {
	get,
	post
}

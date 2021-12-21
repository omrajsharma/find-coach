export default {
    async contactCoach(context, payload) {
        const newRequest = {
            // id: new Date().toISOString(),
            // coachId: payload.coachId,
            userEmail: payload.email,
            message: payload.message,
        };

        const response = await fetch(`https://vue-http-req-145d4-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        })

        // firebase post request sends a unique ID and send in 'name'

        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failedd to send request');
            throw error;
        }

        console.log(responseData.name);
        
        newRequest.id = responseData.name;
        newRequest.coachId = payload.coachId;
        
        context.commit('addRequest', newRequest);
    },

    async fetchRequests(context) {
        const coachId = context.rootGetters.userId;
        const response = await fetch(`https://vue-http-req-145d4-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${coachId}.json`);
        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'failed to fetch request.');
            throw error;
        }

        console.log(responseData);
        
        const requests = [];

        for( const key in responseData){
            const request = {
                id: key,
                coachId: coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            };
            requests.push(request);
        }

        console.log(requests)

        context.commit('setRequests', requests);
    }
};
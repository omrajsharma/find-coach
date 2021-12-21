export default {
    
    
    // REGISTER COACHES
    async registerCoach(context, data){
        const userId = context.rootGetters.userId;
        const coachData = {
            // id: context.rootGetters.userId,
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        }

        const response = await fetch(`https://vue-http-req-145d4-default-rtdb.asia-southeast1.firebasedatabase.app/coaches/${userId}.json`, {
            // method: "POST"
            method: 'PUT',
            body: JSON.stringify(coachData)
        });
        // we can use .then promise or asyn await

        // const responseData = await response.json;

        if(!response.ok){
            console.log('error!!')
            // errors...
        }

        // context.commit('registerCoach', coachData);
        context.commit('registerCoach', {
            ...coachData,
            id: userId,

        })
    },

    // LOAD COACHES
    async loadCoaches(context, payload){
        if(!payload.forceRefresh && !context.getters.shouldUpdate){
            return ;
        }
        
        const response = await fetch(`https://vue-http-req-145d4-default-rtdb.asia-southeast1.firebasedatabase.app/coaches.json`, );
        const responseData = await response.json();

        if(!response.ok){
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        const coaches = [];
        
        for(const key in responseData){
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas,
            };
            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);

        context.commit('setFetchTimestamp');

    }
};
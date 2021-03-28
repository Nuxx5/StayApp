import { stayService } from '../services/stay.service.js'
export const stayStore = {
    strict: true,
    state: {
        // stays: stayService.query(),
        stays: [],
        filterBy: {
            txt: '',
            startDate: null,
            endDate: null,
            capacity: 0,
            fromPrice: 0,
            toPrice: 1000,
          },
        currStay: null
    },
    getters: {
        staysForDisplay(state) {
            // console.log('filter display', state.filterBy);
            // console.log('stays display', state.stays);
            // const regex = new RegExp(state.filterBy.txt, 'i')
            // return state.stays.filter(stay => {
            //     const containsTxt = regex.test(stay.loc.address);
            //     return containsTxt
                // if (!state.filterBy.complete) return containsTxt
                // const isComplete = (state.filterBy.complete === 'true');
                // const matchesComplete = isComplete ? stay.completedAt : !stay.completedAt;
                // return containsTxt && matchesComplete
            // })
            return state.stays
        },
        // donePrecentage(state) {
        //     const doneStaysAmount = state.stays.filter(stay => stay.completedAt).length;
        //     if(!doneStaysAmount) return
        //     return (doneStaysAmount / state.stays.length) * 100
        // },
        // currStayDateToDisplay(state) {
        //     if (state.currStay.completedAt) return new Date(state.currStay.completedAt).toLocaleDateString('he-IS')
        // }
    },
    mutations: {
        // toggleCompleted(state, payload){
        //     const stay = payload.stay;
        //     let currTime = null;
        //     if(!stay.completedAt) currTime = Date.now();
        //     stayService.toggleCompleted(stay._id, currTime);
        //     stay.completedAt = currTime;
        // },
        removeStayById(state, payload) {
            const id = payload.id
            // stayService.remove(id);
            const idx = state.stays.findIndex(stay => stay._id === id)
            state.stays.splice(idx, 1);
        },
        addStay(state, { stay }) {
            // const stay = payload.stay;
            // stayService.save(stay);
            state.stays.unshift(stay);
        },
        setFilter(state, payload) {
            const filterBy = { ...payload.filterBy }
            state.filterBy = filterBy;
            console.log('filterBy stay-store', filterBy);
        },
        getStayById(state, payload) {
            state.currStay = state.stays.find(stay => {
                return payload.stayId === stay._id
            });

        },
        saveChanges(state, { stay }) {
            // const updatedStay = JSON.parse(JSON.stringify(payload.updatedStay));
            // stayService.save(updatedStay);
            const idx = state.stays.findIndex(t => t._id === stay._id)
            state.stays.splice(idx, 1, stay)
        },
        setStays(state, payload) {
            state.stays = payload.stays;
        }
    },
    actions: {
        removeStayById(context, payload) {
            console.log('payload', payload);
            return stayService.remove(payload.id)
                .then(() => {
                    context.commit(payload)
                })
                .catch(err => {
                    console.log('Store: Cannot remove stay', err);
                    throw new Error('Cannot remove stay');
                })
        },
        saveStay(context, { stay }) {
            // TODO: support EDIT
            console.log('stay', stay);
            const type = (stay._id) ? 'saveChanges' : 'addStay';
            return stayService.save(stay)
                .then(savedStay => {
                    context.commit({ type, stay: savedStay })
                })
                .catch(err => {
                    console.log('Store: Cannot save stay', err);
                    throw new Error('Cannot save stay');
                })
        },
        loadStays(context) {
            stayService.query()
                .then(stays => {
                    context.commit({ type: 'setStays', stays });
                })
                .catch(err => {
                    console.log('Store: Cannot load stays', err);
                    throw new Error('Cannot load stays');
                })
        },
        setFilter(context, payload) {
            console.log('filterBy stay-store', payload.filterBy);
            stayService.query(payload.filterBy)
            .then(stays => {
                context.commit({ type: 'setStays', stays })
          })
        }
    }
}

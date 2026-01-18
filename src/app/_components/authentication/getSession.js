// import resources from '../../resources/resources'

import authConfig from '../../../lib/config/authConfig'
export default async function getSession(){
    let supabase=authConfig.supabaseClient
    await supabase.auth.getSession()
}

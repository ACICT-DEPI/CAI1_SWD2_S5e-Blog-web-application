import mongoose from "mongoose";
import { type } from "os";
const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true,
        unique : true,
    },
    email :{
        type : String,
        required : true,
        unique : true,
    },
    password :{
        type : String,
        required : true,
    },
    profilePicture : {
        type : String,
        default : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAMFBMVEXk5ueutLfb3t+nrrHn6eqrsbTh4+S7wMPT1tixt7rKztDBxsi3vL/q7O3Y293Q09Wdj+FKAAAFPklEQVR4nO2c25LbIAxADRZgrv7/vy042SabOyBH8g7npdP2xWckQBDQNA0Gg8FgMBgMBoPBYDAYDAaDwWAwGAwGg92BzKRlQevtL0cFQMvFOe/NhnduSfqQPtlk8SZYdY0Nxi86HswH4uKDFUrcUoR8OlJ4skoQD0zOPsKG5TDRick+E/kvZNMhdECb+Y1KsZmNZm8DsKp3YfkZPSv1x74BtP8gLGeYBwdS+NxlGzl8bT5OsUuqLRNXHVensuk4pmtOg0uGpQ24FpViQ/3l98Da6CLEyi00sNhmGcFsTgMZmgbMhrLM1hvf7lJWT+rP/8Vas1Y+sGE0CYDsictmwyfRwPTKqBCpJc7A0pdkW2i4zM+xW6VAbXEiuv7AlCKNRaIBgkrGUnsU4to7+s9wCA101DHXqEBtUqYyHBfBoeAEj+WiPLmM7qgwb2SCJHaBFWnIZCx1nkFXufwb5WldJt1dll3JGNo8gxTQXHKe0W45O3b+D1C0gwbajpeeyRDv0RDHf5kBNKWLRBz/ZQYg3XAmg+giRJCEMriTmaA9QYOEt/7Ty+CVzBtqIZXBHP9Fhs6l/LqEKjP/JRnayCCnGW1k/tSYwZ7NxjqDJoN2ArBhKcuZXGhiutDWZpP+S1sAzPOMsjmjlcHdaRJvm3t+Mb+Hss7M9PxkfkdIpC6ohwDE47/8bIbmUm440cpg1gCB/NoJoC2byhBnGWqe0f8OCBIrz2gLsxMRK88MvQvCxZkzxCvmiYhzEBg4uOTSGeWGBvm8fCJilDRsrjVNCLeaeMRlwtgIzPRrzIXOn2mUZROYTOqMDPV1ht90JRrxDvOOnpMN8ssMt0D77QYG1fIdrRto+vs/j2jbpjF93dRUcSrBoPB/CDTY8Llqfkt1lcakVH5M9E9fAd+jBP1FxpfA+nFwVGC2Vt4D8rPg5LBwHfpXwLSYt881lfJ8X2j+AvRi5lc6SpmF7yx2C+jk1ROf/O8+8StgXqNXc++j5jnQ/qLUCkzJ2zlT2meUP2d7lJHyEIhxksvqnFsXOcVDdGd4CfyH+ksa2b5cn5HnJjonzv95DPKn5u9PKSeX9yYEW6bibeGxIRjv3ZpSVpu4GxUPmYpEKPOWul87T1OBsiY7LUlyNdpE1hwL+2yB+S2VlXKcXJL8ki5CFjFBPAjGS6WT0MRolotRuq0rU4XHlVAeS3n5YXGiCVG70pWp69xMWOvpWwRBRLtzrqwj7a8VJyc+GO0f68yGbIuTt2GIJmedQNPzSL7es7Qyi0V/txgt9fAuKptOWL94xllUKg5h6lFh/dZGFKR724yt10aY9RuFAUwO98bsMx0vd19Howy7ZtiVjnX7LjsQ/d4ZdmUjwp7BAY38Kuutzn5nnrB8KcMuzH6fNQfAdVWTbahdLqFXtS7EtBH4z1BAftIdcxebeUVONXjftHRHHdxOezF9fehfgzoNxJUwLgWFZxNX0rig2sBCHBdEG9KxfwHlbn1X60JMEK4+fdZ9+SsgvOJGaV6Gguq9ko79RLYL1dehEiT5pHzN3DUJ9LdhxKXnJjdOtz9Eum7Z8oqL6GmDGJkl2UbjJQJIDF2UaQsN0lMSbJrmgIjaIAsN1fQAitu0/INtqGqQXy3j0dLUEfdxPCKq/m0qm8r/nvqdDW5/PFTq3w7g9pPApfbCfc4y6k9+Tm3rQFb7mFuq+wag9sbApvIwHbdxITZz1aBhPWRKq/qawLAsmC/UDRqMTv97UrfScNsv32BrZDgvmQVVJWNm3lR125HMqVs1gTdVLoPBYDAYDAZH4R8eaVEbhZaf7QAAAABJRU5ErkJggg==",
        
    },
},{timestamps: true});

const User = mongoose.model('User',userSchema);

export default User;
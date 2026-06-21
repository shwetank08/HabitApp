import {
 getOverview,
 getWeeklyTrend,
 getCompletionBreakdown,
}
from "../utils/analytics.js";

export const getAnalytics = async (req,res)=>{

 try{
   const userId = req.user.id;
   const overview =
    await getOverview(userId);
   const weeklyTrend =
    await getWeeklyTrend(userId);
   const completionBreakdown =
    await getCompletionBreakdown(userId);
   return res.status(200).json({
      overview,
      weeklyTrend,
      completionBreakdown,
   });

 }

 catch(error){
   console.log(error);
   return res.status(500).json({
     message:"Analytics failed"
   });
 }
};
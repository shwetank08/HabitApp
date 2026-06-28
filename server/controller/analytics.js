import {
 getOverview,
 getWeeklyTrend,
 getCompletionBreakdown,
 getInsightData
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
   const insights = await getInsightData(userId);
   console.log("insights",insights);
   return res.status(200).json({
      overview,
      weeklyTrend,
      completionBreakdown,
      insights
   });
 }

 catch(error){
   console.log(error);
   return res.status(500).json({
     message:"Analytics failed"
   });
 }
};
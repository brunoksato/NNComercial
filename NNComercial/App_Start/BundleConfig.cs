using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace NNComercial.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Bundle/Scripts").Include(
                "~/Content/Script/jquery-1.7.1.js",
                "~/Content/Script/jquery-1.9.0.min.js",
                "~/Content/Script/index.js",
                "~/Content/Script/bootstrap.js",
                "~/Content/Script/bootbox.js")
            );

            bundles.Add(new StyleBundle("~/Bundle/CSS").Include(
                "~/Content/CSS/default.css",
                "~/Content/CSS/bootstrap.min.css")
            );

            BundleTable.EnableOptimizations = true;
        } 
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace streamProject.models
{
    public class ModelResponse
    {
        public bool success;
        public string message;
        public int itemid;

        public ModelResponse(bool success, string message)
        {
            this.success = success;
            this.message = message;
        }
        public ModelResponse(bool success, string message, int id)
        {
            this.success = success;
            this.message = message;
            this.itemid = id;
        }
    }
}

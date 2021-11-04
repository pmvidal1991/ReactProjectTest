using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace streamProject.models
{
    public class SqlClass
    {
        private String ConString;
        private SqlConnection con;

        public SqlClass(string con)
        {

            this.ConString = con;
            this.con = new SqlConnection(ConString);

        }

        public SqlClass()
        {
        }

        public SqlConnection getCon()
        {
            return this.con;
        }
        public bool testcon()
        {

            bool y = false;
            try
            {
                this.con.Open();
                y = true;
                this.con.Close();
            }
            catch (SqlException ex)
            {
                this.con.Close();
                y = false;
            }
            return y;
        }

        public void closcon()
        {
            this.con.Close();

        }
        public void opencon()
        {
            this.con.Open();
        }
    }
}


              package com.example.demo;
              import org.springframework.boot.SpringApplication;
              import org.springframework.boot.autoconfigure.SpringBootApplication;
              import org.springframework.web.bind.annotation.GetMapping;
              import org.springframework.web.bind.annotation.RequestParam;
              import org.springframework.web.bind.annotation.RestController;
			  
			  import java.sql.*;  
              
              @SpringBootApplication
              @RestController
              public class DemoApplication {
				
				 final static int READ_QUERY = 0;
				 final static int WRITE_QUERY = 1;
	
                  
                  public static void main(String[] args) {
                  SpringApplication.run(DemoApplication.class, args);
                  }
                  
                  @GetMapping("/hello")
                  public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
                  return String.format("Hello %s!", name);
                  }
				  
				  @GetMapping("/getcustomer")
                  public String getcustomer(
				  @RequestParam(value = "name", defaultValue = "x") String name,
				  @RequestParam(value = "email", defaultValue = "0") String email, 
				  @RequestParam(value = "phone", defaultValue = "0") int phone,
				  @RequestParam(value = "feedback", defaultValue = "0") String feedback
				  ) {
					
					String query;
					
					query = "INSERT INTO customer (name,email,phone,feedback) VALUES (" + "'" + name + "'" + "," + "'" + email+ "'" + "," + "'" + phone + "'" +"," + "'" + feedback+ "'" +")";
					
					System.out.println("query=" + query);
					
					executeQuery(query,WRITE_QUERY);
					
					return "saved customer";
                  
				  }
				  
				  public static void executeQuery(String query, int querytype)
					{
						Statement stmt; //used for SELECT query
						PreparedStatement preparedStmt; //used for UPDATE, DELETE, INSERT
						ResultSet rs = null;
						ResultSetMetaData metaData = null;
						String columnName;
						int count;
						int type;
						//Document doc=null;
						
						try
						{  
							Class.forName("com.mysql.cj.jdbc.Driver");  
							Connection con=DriverManager.getConnection(  
								"jdbc:mysql://localhost:3306/customers","root","mysql");  
								
							stmt=con.createStatement();  
					
							if (querytype == READ_QUERY)
							{
								
								rs=stmt.executeQuery(query);  
								
								//UNCOMMENT TO PRINT RECORDS
								/*while (rs.next()) {
									 metaData = rs.getMetaData();
									 count = metaData.getColumnCount();
									 System.out.println("Total columns =" + count);
									 for (int i = 1; i <= count; i++)
									 {
									   columnName = metaData.getColumnName(i);
									   System.out.println("ColumnName =" + columnName);
									   type = metaData.getColumnType(i);
									   System.out.println("ColumnType=" + type);
									   if (type == Types.VARCHAR || type == Types.CHAR || type == 93) {
										   System.out.println(rs.getString(columnName));
										   
									   }
									   if (type==Types.INTEGER){
										   System.out.println(rs.getInt(columnName	));
										}
									 }
								}*/
								
								
							}
							else if (querytype == WRITE_QUERY)
							{
								preparedStmt = con.prepareStatement(query);
								preparedStmt.execute();
							}
								
							//doc = toDocument(rs);					
							
							con.close();  		
						}
						catch(Exception e)
						{ 
							System.out.println(e.toString());
							rs = null;
						}  
						
						//return doc;
					}
              }
            
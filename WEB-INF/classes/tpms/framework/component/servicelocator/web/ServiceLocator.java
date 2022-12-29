package tpms.framework.component.servicelocator.web;

import tpms.framework.component.servicelocator.ServiceLocatorException;
import java.net.URL;
import java.util.*;

/* pie queue 임시 추가 */
import java.util.Queue;

import javax.ejb.EJBHome;
import javax.ejb.EJBLocalHome;
import javax.jms.*;
import javax.naming.InitialContext;
import javax.rmi.PortableRemoteObject;
import javax.sql.DataSource;
import javax.transaction.UserTransaction;

public final class ServiceLocator
{

    private InitialContext ic;
    private Map cache;
    private static ServiceLocator instance = new ServiceLocator();

    public static ServiceLocator getInstance()
    {
        return instance;
    }

    private ServiceLocator()
        throws ServiceLocatorException
    {
        cache = Collections.synchronizedMap(new HashMap());
        try
        {
            ic = new InitialContext();
        }
        catch(Exception e)
        {
            throw new ServiceLocatorException(e);
        }
    }

    public EJBLocalHome getLocalHome(String jndiHomeName)
        throws ServiceLocatorException
    {
        EJBLocalHome home = (EJBLocalHome)cache.get(jndiHomeName);
        if(home == null)
            try
            {
                home = (EJBLocalHome)ic.lookup(jndiHomeName);
                cache.put(jndiHomeName, home);
            }
            catch(Exception e)
            {
                throw new ServiceLocatorException(e);
            }
        return home;
    }

    public EJBHome getRemoteHome(String jndiHomeName, Class className)
        throws ServiceLocatorException
    {
        EJBHome home = (EJBHome)cache.get(jndiHomeName);
        if(home == null)
            try
            {
                Object objref = ic.lookup(jndiHomeName);
                Object obj = PortableRemoteObject.narrow(objref, className);
                home = (EJBHome)obj;
                cache.put(jndiHomeName, home);
            }
            catch(Exception e)
            {
                throw new ServiceLocatorException(e);
            }
        return home;
    }

    public QueueConnectionFactory getQueueConnectionFactory(String qConnFactoryName)
        throws ServiceLocatorException
    {
        QueueConnectionFactory factory = (QueueConnectionFactory)cache.get(qConnFactoryName);
        if(factory == null)
            try
            {
                factory = (QueueConnectionFactory)ic.lookup(qConnFactoryName);
                cache.put(qConnFactoryName, factory);
            }
            catch(Exception e)
            {
                throw new ServiceLocatorException(e);
            }
        return factory;
    }

    public Queue getQueue(String queueName)
        throws ServiceLocatorException
    {
        Queue queue = (Queue)cache.get(queueName);
        if(queue == null)
            try
            {
                queue = (Queue)ic.lookup(queueName);
                cache.put(queueName, queue);
            }
            catch(Exception e)
            {
                throw new ServiceLocatorException(e);
            }
        return queue;
    }

    public TopicConnectionFactory getTopicConnectionFactory(String topicConnFactoryName)
        throws ServiceLocatorException
    {
        TopicConnectionFactory factory = (TopicConnectionFactory)cache.get(topicConnFactoryName);
        if(factory == null)
            try
            {
                factory = (TopicConnectionFactory)ic.lookup(topicConnFactoryName);
                cache.put(topicConnFactoryName, factory);
            }
            catch(Exception e)
            {
                throw new ServiceLocatorException(e);
            }
        return factory;
    }

    public Topic getTopic(String topicName)
        throws ServiceLocatorException
    {
        Topic topic = (Topic)cache.get(topicName);
        if(topic == null)
            try
            {
                topic = (Topic)ic.lookup(topicName);
                cache.put(topicName, topic);
            }
            catch(Exception e)
            {
                throw new ServiceLocatorException(e);
            }
        return topic;
    }

    public DataSource getDataSource(String dataSourceName)
        throws ServiceLocatorException
    {
        DataSource dataSource = (DataSource)cache.get(dataSourceName);
        if(dataSource == null)
            try
            {
                dataSource = (DataSource)ic.lookup(dataSourceName);
                cache.put(dataSourceName, dataSource);
            }
            catch(Exception e)
            {
                throw new ServiceLocatorException(e);
            }
        return dataSource;
    }

    public UserTransaction getUserTransaction(String utName)
        throws ServiceLocatorException
    {
        try{
          return (UserTransaction)ic.lookup(utName);
        }catch(Exception e){

          throw new ServiceLocatorException(e);
        }
    }

    public URL getUrl(String envName)
        throws ServiceLocatorException
    {
        try{
          return (URL)ic.lookup(envName);
        }catch(Exception e){

          throw new ServiceLocatorException(e);
        }
    }

    public boolean getBoolean(String envName)
        throws ServiceLocatorException
    {
        try{
          return ((Boolean)ic.lookup(envName)).booleanValue();
        }catch(Exception e){

          throw new ServiceLocatorException(e);
        }
    }

    public String getString(String envName)
        throws ServiceLocatorException
    {
        try{
          return (String)ic.lookup(envName);
        }catch(Exception e){

          throw new ServiceLocatorException(e);
        }
    }

}

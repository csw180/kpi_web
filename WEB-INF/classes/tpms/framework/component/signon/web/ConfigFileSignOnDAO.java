package tpms.framework.component.signon.web;

import java.io.*;
import java.net.*;
import java.util.*;
import javax.xml.parsers.*;

import org.apache.log4j.*;
import org.w3c.dom.*;
import org.xml.sax.*;

public class ConfigFileSignOnDAO {

  private Logger log;
  public static final String SIGNON_FORM_LOGIN_PAGE = "signon-form-login-page";
  public static final String SIGNON_FORM_ERROR_PAGE = "signon-form-error-page";
  public static final String SECURITY_CONSTRAINT = "security-constraint";
  public static final String WEB_RESOURCE_COLLECTION = "web-resource-collection";
  public static final String WEB_RESOURCE_NAME = "web-resource-name";
  public static final String URL_PATTERN = "url-pattern";
  public static final String AUTH_CONSTRAINT = "auth-constraint";
  public static final String ROLE_NAME = "role-name";
  public static final String MAIN_PAGE_REDIRECT_CONSTRAINT =  "main-page-redirect-constraint";
  public static final String URL_RESOURCE = "url-resource";
  public static final String URL_NAME = "url-name";
  public static final String TARGET_URL = "target-url";
  public static final String SIGNON_FORM_MAIN_PAGE = "signon-form-main-page";
  private HashMap loginResources;
  private String signMainPage;
  private String signOnLoginPage;
  private String signOnErrorPage;
  private HashMap protectedResources;

  public ConfigFileSignOnDAO(URL configURL) {
    log = Logger.getLogger(getClass().getName());
    loginResources = null;
    signMainPage = null;
    signOnLoginPage = null;
    signOnErrorPage = null;
    protectedResources = null;
    Element root = loadDocument(configURL);
    protectedResources = getProtectedResources(root);
  }

  public String getSignOnPage() {
    return signOnLoginPage;
  }

  public String getSignOnErrorPage() {
    return signOnErrorPage;
  }

  public HashMap getProtectedResources() {
    return protectedResources;
  }

  public HashMap getLoginMappings() {
    return protectedResources;
  }

  public String getSignMainPage() {
    return signMainPage;
  }

  private Element loadDocument(URL url) {
    try {
      Document doc = null;
      Element root;
      InputSource xmlInp = new InputSource(url.openStream());
      DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.
          newInstance();
      DocumentBuilder parser = docBuilderFactory.newDocumentBuilder();
      doc = parser.parse(xmlInp);
      root = doc.getDocumentElement();
      root.normalize();
      return root;
    }
    catch (SAXParseException err) {

      System.err.println("ConfigFileSignOnDAO  ** Parsing error, line " +
                         err.getLineNumber() + ", uri " + err.getSystemId());
      System.err.println("ConfigFileSignOnDAO  error: " + err.getMessage());
//        break MISSING_BLOCK_LABEL_247;
    }
    catch (SAXException e) {

      System.err.println("ConfigFileSignOnDAO  error: " + e);
//        break MISSING_BLOCK_LABEL_247;
    }
    catch (MalformedURLException mfx) {

      System.err.println("ConfigFileSignOnDAO  error: " + mfx);
//        break MISSING_BLOCK_LABEL_247;
    }
    catch (IOException e) {

      System.err.println("ConfigFileSignOnDAO  error: " + e);
//        break MISSING_BLOCK_LABEL_247;
    }
    catch (Exception pce) {

      System.err.println("ConfigFileSignOnDAO  error: " + pce);
    }
    return null;
  }

  private HashMap getProtectedResources(Element root) {
    HashMap resources = new HashMap();
    signOnLoginPage = getTagValue(root, "signon-form-login-page").trim();
    signOnErrorPage = getTagValue(root, "signon-form-error-page").trim();
    signMainPage = getTagValue(root, "signon-form-main-page").trim();
    NodeList outterList = root.getElementsByTagName("security-constraint");
    for (int outterLoop = 0; outterLoop < outterList.getLength(); outterLoop++) {
      Element element = (Element) outterList.item(outterLoop);
      ArrayList roles = new ArrayList();
      NodeList roleList = element.getElementsByTagName("auth-constraint");
      for (int roleLoop = 0; roleList != null && roleLoop < roleList.getLength();
           roleLoop++) {
        Node roleNode = roleList.item(roleLoop);
        String roleName = getSubTagValue(roleNode, "role-name");
        if (roleName != null && !roleName.equals("")) {
          roles.add(roleName);
        }
      }

      NodeList list = element.getElementsByTagName("web-resource-collection");
      for (int loop = 0; list != null && loop < list.getLength(); loop++) {
        Node node = list.item(loop);
        if (node != null) {
          String resourceName = getSubTagValue(node, "web-resource-name");
          String urlPattern = getSubTagValue(node, "url-pattern");
          ProtectedResource resource = new ProtectedResource(resourceName,
              urlPattern, roles);
          if (!resources.containsKey(resourceName)) {
            resources.put(resourceName, resource);
          }
          else {
            System.err.println("*** Non Fatal errror: Protected Resource " +
                               resourceName +
                " defined more than once in screen definitions file");
          }
        }
      }

    }

    return resources;
  }

  private HashMap getLoginMappings(Element root) {
    HashMap resultMappings = null;
    NodeList list = root.getElementsByTagName("main-page-redirect-constraint");
    for (int loop = 0; loop < list.getLength(); loop++) {
      Node node = list.item(loop);
      if (node != null) {
        Element mainElement = (Element) node;
        String targetUrl = mainElement.getAttribute("target-url");
        NodeList results = mainElement.getElementsByTagName("url-resource");
        if (results.getLength() > 0) {
          resultMappings = new HashMap();
        }
        for (int resultLoop = 0; resultLoop < results.getLength(); resultLoop++) {
          Node resultNode = results.item(resultLoop);
          if (resultNode instanceof Element) {
            Element resultElement = (Element) resultNode;
            String key = resultElement.getAttribute("url-name").trim();
            log.debug("key:" + key + " value:" + targetUrl);
            if (!resultMappings.containsKey(key)) {
              resultMappings.put(key, targetUrl);
            }
          }
        }

      }
    }

    return resultMappings;
  }

  private String getSubTagAttribute(Element root, String tagName,
                                    String subTagName, String attribute) {
    String returnString = "";
    NodeList list = root.getElementsByTagName(tagName);
    for (int loop = 0; list != null && loop < list.getLength(); loop++) {
      Node node = list.item(loop);
      if (node != null) {
        NodeList children = node.getChildNodes();
        for (int innerLoop = 0; innerLoop < children.getLength(); innerLoop++) {
          Node child = children.item(innerLoop);
          if (child != null && child.getNodeName() != null &&
              child.getNodeName().equals(subTagName) &&
              (child instanceof Element)) {
            return ( (Element) child).getAttribute(attribute);
          }
        }

      }
    }

    return returnString;
  }

  private String getSubTagValue(Node node, String subTagName) {
    String returnString = "";
    if (node != null) {
      NodeList children = node.getChildNodes();
      for (int innerLoop = 0;
           children != null && innerLoop < children.getLength(); innerLoop++) {
        Node child = children.item(innerLoop);
        if (child != null && child.getNodeName() != null &&
            child.getNodeName().equals(subTagName)) {
          Node grandChild = child.getFirstChild();
          if (grandChild.getNodeValue() != null) {
            return grandChild.getNodeValue();
          }
        }
      }

    }
    return returnString;
  }

  private String getSubTagValue(Element root, String tagName, String subTagName) {
    String returnString = "";
    NodeList list = root.getElementsByTagName(tagName);
    for (int loop = 0; list != null && loop < list.getLength(); loop++) {
      Node node = list.item(loop);
      if (node != null) {
        NodeList children = node.getChildNodes();
        for (int innerLoop = 0; innerLoop < children.getLength(); innerLoop++) {
          Node child = children.item(innerLoop);
          if (child != null && child.getNodeName() != null &&
              child.getNodeName().equals(subTagName)) {
            Node grandChild = child.getFirstChild();
            if (grandChild.getNodeValue() != null) {
              return grandChild.getNodeValue();
            }
          }
        }

      }
    }

    return returnString;
  }

  private String getTagValue(Element root, String tagName) {
    String returnString = "";
    NodeList list = root.getElementsByTagName(tagName);
    for (int loop = 0; list != null && loop < list.getLength(); loop++) {
      Node node = list.item(loop);
      if (node != null) {
        Node child = node.getFirstChild();
        if (child != null && child.getNodeValue() != null) {
          return child.getNodeValue();
        }
      }
    }

    return returnString;
  }
}

### Magento modes
| mode \ respects | cache static files | error handle                              | http heade |
|-----------------|--------------------|-------------------------------------------|------------|
| default         | yes                | usual log                                 | hide       |
| developer       | no                 | verbose logging,display exception to user | show       |
| production      | yes                | usual logging                             | unknown    |

 * default: only to deploy on single server .
 * developer mode: automatical code compilation ,debugging
 * production mode: static view files are served from cache only. New or updated files are not written to the file system
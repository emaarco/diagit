import { defineContentScript } from 'wxt/utils/define-content-script'
import { githubHost } from '../src/git-hosts/hosts'
import { HostPage } from '../src/platform/page/HostPage'
import { BlobViewerController } from '../src/views/blob-viewer/BlobViewerController'

export default defineContentScript({
  registration: 'runtime',
  cssInjectionMode: 'manual',
  main(ctx) {
    new BlobViewerController(new HostPage(ctx), githubHost.blobPage).start()
  },
})



import traverseFileTree from 'traverse-file-tree'

import * as VirtualFileSystem from 'datastore/virtual-file-system'

onmessage = function(e) {
  const data = e.data
  const dropped_folder_path = data.dropped_folder_path

  const [path,origin] = traverseFileTree(dropped_folder_path)

  let vfs = VirtualFileSystem.make(origin)
  vfs = VirtualFileSystem.derivate(vfs)

  postMessage(VirtualFileSystem.toJs(vfs))
}

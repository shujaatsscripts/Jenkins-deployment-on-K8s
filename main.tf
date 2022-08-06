resource "kubernetes_namespace" "jenkins_namespace" {
  metadata {
    name = var.namespace
  }
}

resource "kubernetes_persistent_volume_v1" "persistent_volume" {
  metadata {
    name = "jenkins-pv"
    }
    spec {
      access_modes = [var.accessmode]
      capacity = {
        storage = var.request_storage
      }
      storage_class_name = var.storageclass
      persistent_volume_source {
        host_path {
          path = "/data/jenkins-volume/"
        }
      }
    }
    depends_on = [
          kubernetes_namespace.jenkins_namespace
        ]
}

# resource "kubernetes_secret_v1" "jenkins-secret" {
#   metadata {
#     name = var.serviceaccount
#     namespace = var.namespace
#   }
# }

resource "kubernetes_service_account_v1" "jenkins-sa" {
  metadata {
    name = var.serviceaccount
    namespace = var.namespace
  }
}
#   secret {
#     name = "${kubernetes_secret_v1.jenkins-secret.metadata.0.name}"
#   }
#   automount_service_account_token = true
#   depends_on = [kubernetes_secret_v1.jenkins-secret]
#   timeouts {
#       create = "60m"
#     }
# }
 





resource "kubernetes_cluster_role_v1" "jenkins-cluster-role" {
  metadata {
    name = var.name
  }
  rule {
    api_groups = ["*"]
    resources  = [ "statefulsets", "services", "replicationcontrollers", "replicasets", "podtemplates", "podsecuritypolicies", "pods", "pods/log", "pods/exec", "podpreset", "poddisruptionbudget", "persistentvolumes", "persistentvolumeclaims", "jobs", "endpoints", "deployments", "deployments/scale", "daemonsets", "cronjobs", "configmaps", "namespaces", "events", "secrets" ]
    verbs      = [ "create", "get", "watch", "delete", "list", "patch", "update" ]
  }
  rule {
    api_groups = [""]
    resources  = [ "nodes"]
    verbs      = ["get", "watch","list","update" ]
  }

}


resource "kubernetes_cluster_role_binding_v1" "jenkins-crb" {
  metadata {
    name = var.name
  }
  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = var.name
  }
  subject {
    kind      = "Group"
    name      = "system:serviceaccounts:jenkins"
    api_group = "rbac.authorization.k8s.io"
  }
  depends_on = [kubernetes_cluster_role_v1.jenkins-cluster-role ]
}

resource "helm_release" "jenkins-server" {
  name       = var.name
  namespace  = var.namespace
  repository = "https://charts.jenkins.io"
  chart      = "jenkins"
  values = [
    file("${path.module}/jenkins-values.yaml")
  ]
  timeout = 600
  depends_on = [kubernetes_cluster_role_binding_v1.jenkins-crb,kubernetes_namespace.jenkins_namespace, kubernetes_persistent_volume_v1.persistent_volume]
}